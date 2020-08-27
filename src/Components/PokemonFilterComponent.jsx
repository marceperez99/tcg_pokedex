import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

/**
 * Componente que muestra un campo para ingresar el texto con el que se filtrará
 * la lista de pokemon.
 */
class PokemonFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
    };
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleSubmitClick = this.handleSubmitClick.bind(this);
  }

  /**
   * EventListener ejecutado cuando se modifica el campo de texto, este toma el
   * valor del input y lo guarda en el estado del compomente como filterText.
   * @param {Object} e - Objeto con la información del evento
   */
  handleFilterTextChange(e) {
    const text = e.target.value;
    this.setState({ filterText: text });
  }

  /**
   * EventListener ejecutado al dar click en el boton de Buscar, este toma el valor
   * de filterText y filtra los pokemon utilizando la función que fue pasada por props.
   */
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

PokemonFilter.propTypes = {
  /** Funcion encargada de filtrar los pokemon */
  filterPokemons: PropTypes.func.isRequired,
};

export default PokemonFilter;
