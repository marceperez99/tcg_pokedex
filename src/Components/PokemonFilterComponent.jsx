import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

class PokemonFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
    };
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleSubmitClick = this.handleSubmitClick.bind(this);
  }

  handleFilterTextChange(e) {
    const text = e.target.value;
    this.setState({ filterText: text });
  }

  handleSubmitClick() {
    const { filterPokemons } = this.props;
    const { filterText } = this.state;
    filterPokemons(filterText);
  }

  render() {
    return (
      <div className="row my-3">
        <div className="col-4 lead text-right">
          Buscador de Pokemons
        </div>
        <div className="col-4">

          <input
            type="text"
            onChange={this.handleFilterTextChange}
            className="form-control"
            id="searchText"
            placeholder="Ingrese el nombre del Pokemon"
          />
        </div>
        <div className="col-4">
          <button type="button" className="btn btn-primary" onClick={this.handleSubmitClick}>
            Buscar
          </button>
        </div>
      </div>

    );
  }
}
export default PokemonFilter;
PokemonFilter.propTypes = {
  filterPokemons: PropTypes.func.isRequired,
};
