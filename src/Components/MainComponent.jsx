import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './HomeComponent';
import PokemonDetail from './PokemonDetailCompoment';

const pokemonAPI = 'https://api.pokemontcg.io/v1/cards?subtype=Basic';

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
export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemonList: [],
      filteredPokemon: [],
      isFetching: false,
      fetchingFailed: false,
    };
    this.queryPokemons = this.queryPokemons.bind(this);
    this.filterPokemons = this.filterPokemons.bind(this);
  }

  componentDidMount() {
    this.setState({ isFetching: true });
    fetch(pokemonAPI)
      .then((data) => {
        if (data.status !== 200) throw new Error(`Http Status ${data.status}`);
        return data.json();
      })
      .then((body) => body.cards)
      .then((cards) => cards.map((pokemonCard) => extractPokemonData(pokemonCard)))
      .then((cards) => cards.filter((card) => !card.name.includes('Energy')))
      .then((pokemonList) => {
        this.setState({
          fetchingFailed: false,
          isFetching: false,
          pokemonList,
          filteredPokemon: pokemonList,
        });
      })
      .catch(() => {
        this.setState({
          fetchingFailed: true, isFetching: false, pokemonList: [], filteredPokemon: [],
        });
      });
  }

  queryPokemons(page, maxPokemonNumber) {
    const { filteredPokemon } = this.state;
    return filteredPokemon
      .slice((page - 1) * maxPokemonNumber, page * maxPokemonNumber);
  }

  filterPokemons(text) {
    const { pokemonList } = this.state;
    this.setState({
      filteredPokemon: pokemonList.filter((pokemon) => (
        pokemon.name.toLowerCase().includes(text.toLowerCase()))),
    });
  }

  render() {
    const {
      pokemonList, filteredPokemon, isFetching, fetchingFailed,
    } = this.state;
    if (isFetching) {
      return (<h1>Loading</h1>);
    }
    if (fetchingFailed) {
      return (<h1>Fetching Failed</h1>);
    }

    const homeComponent = () => (
      <Home key="home" totalPokemon={filteredPokemon.length} filterPokemons={this.filterPokemons} queryPokemons={this.queryPokemons} />
    );
    const pokemonDetailComponent = ({ match }) => {
      const pokemonData = pokemonList.find((pokemon) => pokemon.id === match.params.pokemonId);

      return (
        <PokemonDetail pokemon={pokemonData} />
      );
    };
    return (
      <div className="container mt-3 p-3 border rounded">

        <Switch>
          <Route exact path="/pokemon" component={homeComponent} />
          <Route path="/pokemon/:pokemonId" component={pokemonDetailComponent} />
          <Redirect to="/pokemon" />
        </Switch>
      </div>
    );
  }
}
