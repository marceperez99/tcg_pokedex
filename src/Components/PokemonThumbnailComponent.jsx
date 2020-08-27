import React from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';

/**
 * Componente funcional que muestra el nombre y la imagen de un Pokemon.
 * @param {Object} props - Propiedades del Componente.
 * @param {Object} props.pokemon - Objeto con la información de un pokemon
 * @param {string} props.pokemon.id - Identificador único de un pokemon.
 * @param {string} props.pokemon.name - Nombre del Pokemon.
 * @param {string} props.pokemon.image - URL de la imagen del Pokemon.
 */
export default function PokemonThumbNail({ pokemon }) {
  return (
    <div className="col-12 col-md-4 p-3">
      <div className="card">
        <div className="card-header">
          <p className="h5"><Link to={`/pokemon/${pokemon.id}`}>{pokemon.name}</Link></p>
        </div>
        <div className="card-body text-center">
          <img className="col-12" src={pokemon.image} alt={pokemon.name} />
        </div>
      </div>
    </div>
  );
}
PokemonThumbNail.propTypes = {
  pokemon: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
};
