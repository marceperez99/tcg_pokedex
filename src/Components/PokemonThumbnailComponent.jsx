import React from 'react';
import { PropTypes } from 'prop-types';

export default function PokemonThumbNail({ pokemon }) {
  return (
    <div className="col-12 col-md-4 p-3">
      <div className="card">
        <div className="card-header">
          <p className="h5">{pokemon.name}</p>
        </div>
        <div className="card-body text-center">
          <img className="col-12" src={pokemon.image} alt="" />
        </div>
      </div>
    </div>
  );
}
PokemonThumbNail.propTypes = {
  pokemon: PropTypes.shape({ name: PropTypes.string, image: PropTypes.string }).isRequired,
};
