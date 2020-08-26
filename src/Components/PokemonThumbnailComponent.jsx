import React from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';

export default function PokemonThumbNail({ pokemon }) {
  return (
    <div className="col-12 col-md-4 p-3">
      <div className="card">
        <div className="card-header">
          <p className="h5"><Link to={`/pokemon/${pokemon.id}`}>{pokemon.name}</Link></p>
        </div>
        <div className="card-body text-center">
          <img className="col-12" src={pokemon.image} alt="" />
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
    hp: PropTypes.string,
    types: PropTypes.arrayOf(PropTypes.string),

    attacks: PropTypes.arrayOf(PropTypes.any),
  }).isRequired,
};
