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
      isFetching: false,
      fetchingFailed: false,
    };
    this.queryPokemons = this.queryPokemons.bind(this);
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
        this.setState({ fetchingFailed: false, isFetching: false, pokemonList });
      })
      .catch(() => {
        this.setState({ fetchingFailed: true, isFetching: false, pokemonList: [] });
      });
  }

  queryPokemons(page, maxPokemonNumber) {
    const { pokemonList } = this.state;
    return pokemonList.slice((page - 1) * maxPokemonNumber, page * maxPokemonNumber);
  }

  render() {
    const { pokemonList, isFetching, fetchingFailed } = this.state;
    if (isFetching) {
      return (<h1>Loading</h1>);
    }
    if (fetchingFailed) {
      return (<h1>Fetching Failed</h1>);
    }

    const homeComponent = () => (
      <Home totalPokemon={pokemonList.length} queryPokemons={this.queryPokemons} />
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
