import React, { Component } from 'react';

const pokemonAPI = 'https://api.pokemontcg.io/v1/cards?subtype=Basic';

const extract_pokemon_data = (pokemon_data) => ({
    id: pokemon_data.id,
    name: pokemon_data.name,
    image: pokemon_data.imageUrl
})

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pokemonList: [],
            isFetching: false,
            fetchingFailed: false,
        }
    }
    componentDidMount() {
        this.setState({ ...this.state, isFetching: true })
        fetch(pokemonAPI)
            .then(data => {
                if (data.status !== 200) throw new Error(`Http Status ${data.status}`);
                return data.json();
            })
            .then(body => body.cards)
            .then(cards => cards.map(pokemon_card => extract_pokemon_data(pokemon_card)))
            .then(pokemonList => this.setState({ ...this.state, fetchingFailed: false, isFetching: false, pokemonList: pokemonList }))
            .catch(error => {
                this.setState({ ...this.state, fetchingFailed: true, isFetching: false, pokemonList: [] })
                console.log(error);
            })
    }
    render() {
        return (
            <div className="container mt-3 border rounded">
                Hi
            </div>
        );
    }
}