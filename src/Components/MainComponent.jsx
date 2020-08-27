import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './HomeComponent';
import PokemonDetail from './PokemonDetailCompoment';
import Loading from './LoadingComponent';
import ErrorLoading from './ErrorLoadingComponent';

const pokemonAPI = 'https://api.pokemontcg.io/v1/cards?subtype=Basic';

/**
 * Función utilitaria que toma los datos de un Pokemon y retorna otro objeto solo
 * con los datos que son necesarios dentro de la página.
 * @param {Object} pokemonData - Objeto obtenido de la API con toda la información
 * de un pokemon.
 */
function extractPokemonData(pokemonData) {
  return ({
    id: pokemonData.id,
    name: pokemonData.name,
    image: pokemonData.imageUrl,
    types: pokemonData.types,
    hp: pokemonData.hp,
    attacks: pokemonData.attacks,
  });
}
/**
 * Componente principal donde se mantiene como estado la lista de Pokemon obtenida
 * desde la API y la lista de Pokemon filtrados que serán mostrados al usuario.
 * Así tambien se tienen dos valores booleanos isFetching y fetchingFailed como indicadores
 * de que si se está obteniendo los datos de la API y de si hubo un error al obtener los datos
 * de la API.
 */
class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemonList: [],
      filteredPokemon: [],
      isFetching: true,
      fetchingFailed: false,
    };
    this.queryPokemons = this.queryPokemons.bind(this);
    this.filterPokemons = this.filterPokemons.bind(this);
  }

  /**
   * Metodo a ejecutarse luego de que el componente se haya montado.
   * Este se encarga de interactuar con la API de Pokemon y guarda la lista
   * obtenida dentro del estado del componente.
   */
  componentDidMount() {
    this.setState({ isFetching: true });
    fetch(pokemonAPI)
      .then((data) => {
        if (data.status !== 200) throw new Error(`Http Status ${data.status}`);
        return data.json();
      })
      .then((body) => body.cards)
      .then((cards) => cards.filter((card) => !card.name.includes('Energy')))
      .then((cards) => cards.map((pokemonCard) => extractPokemonData(pokemonCard)))
      .then((pokemonList) => {
        this.setState({
          pokemonList,
          filteredPokemon: pokemonList,
          fetchingFailed: false,
          isFetching: false,
        });
      })
      .catch(() => {
        this.setState({
          fetchingFailed: true, isFetching: false, pokemonList: [], filteredPokemon: [],
        });
      });
  }

  /**
   * Método utilizado para obtener una sublista de pokemon para que solo estos puedan
   * ser visibles cuando el usuario está en una pagina particular de la paginación.
   * @param {number} page - Número de Página en la que está el usuario.
   * @param {number} maxPokemonNumber - Número de pokemon que deben mostrarse en pantalla.
   */
  queryPokemons(page, maxPokemonNumber) {
    const { filteredPokemon } = this.state;
    return filteredPokemon
      .slice((page - 1) * maxPokemonNumber, page * maxPokemonNumber);
  }

  /**
   * Método que filtra los pokemon a ser mostrados al usuario y solo deja aquellos
   * cuyo nombre contenga la cadena pasada como parametro.
   * @param {string} text - cadena con la que se filtran los pokemon.
   */
  filterPokemons(text) {
    const { pokemonList } = this.state;
    this.setState({
      filteredPokemon: pokemonList.filter((pokemon) => (
        pokemon.name.toLowerCase().includes(text.toLowerCase()))),
    });
  }

  render() {
    let contenido;
    const {
      pokemonList, filteredPokemon, isFetching, fetchingFailed,
    } = this.state;
    if (isFetching) {
      contenido = <Loading />;
    } else if (fetchingFailed) {
      contenido = <ErrorLoading />;
    } else {
      const homeComponent = () => (
        <Home key="home" totalPokemon={filteredPokemon.length} filterPokemons={this.filterPokemons} queryPokemons={this.queryPokemons} />
      );
      const pokemonDetailComponent = ({ match }) => {
        const pokemonData = pokemonList.find((pokemon) => pokemon.id === match.params.pokemonId);
        return <PokemonDetail key={pokemonData.id} pokemon={pokemonData} />;
      };
      contenido = (
        <Switch>
          <Route exact path="/pokemon" component={homeComponent} />
          <Route path="/pokemon/:pokemonId" component={pokemonDetailComponent} />
          <Redirect to="/pokemon" />
        </Switch>
      );
    }
    return (
      <div className="container mt-3 p-3 border rounded">
        {contenido}
      </div>
    );
  }
}

export default Main;
