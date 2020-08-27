import React from 'react';
import { PropTypes } from 'prop-types';
import pokemonTypes from '../shared/pokemon_types_logos';

const Attack = ({ attack }) => {
  const elementCosts = {};
  attack.cost.forEach((element) => {
    elementCosts[element] = elementCosts[element] ? elementCosts[element] + 1 : 1;
  });

  const cost = Object.entries(elementCosts).map(([element, nroNecesitado]) => (
    <div key={`${attack.name}_${element}`}>
      <span style={{ margin: '10px' }}>{nroNecesitado}</span>
      <img src={pokemonTypes[element.toLowerCase()]} alt={element.toLowerCase()} />
    </div>
  ));
  return (
    <div className="card my-2">
      <div className="card-body row">
        <h6 className="col-12">{attack.name}</h6>
        <hr className="col-10" />
        <h6 className="col-12 col-md-4">Costo</h6>
        <div className="col-12 col-md-8">{cost}</div>
        {attack.text
          ? (
            <>
              <h6 className="col-12 col-md-4">Descripción</h6>
              <p className="col-12 col-md-8">{attack.text}</p>
            </>
          )
          : ''}
        {attack.damage
          ? (
            <>
              <h6 className="col-12 col-md-4">Daño</h6>
              <p className="col-12 col-md-8">{attack.damage}</p>
            </>
          )
          : ''}
      </div>
    </div>

  );
};
const Type = ({ type }) => (
  <h4>
    <span className="badge badge-pill badge-light border">
      <img src={pokemonTypes[type.toLowerCase()]} alt={type.toLowerCase()} />
      {`  ${type}`}
    </span>
  </h4>
);

const PokemonInfo = ({ pokemon }) => {
  const types = pokemon.types.map((type) => <Type key={type} type={type} />);
  const attacks = pokemon.attacks.map((attack) => <Attack key={attack.name} attack={attack} />);
  return (
    <>
      <div className="col-10 col-sm-4">
        <img src={pokemon.image} className="col-12" alt={pokemon.image} />
      </div>
      <div className="col-10 col-sm-8 mx-auto">
        <div className="row">
          <div className="col-4 h5">Tipo</div>
          <div className="col-6">{types}</div>
          <div className="col-4 h5 my-3">HP</div>
          <div className="col-6 my-3">{pokemon.hp}</div>
          <div className="col-12 col-md-4 h5 my-3">Ataques</div>
          <div className="col-12 col-md-8 my-3">
            {attacks}
          </div>
        </div>
      </div>
    </>
  );
};
Attack.propTypes = {
  attack: PropTypes.shape({
    name: PropTypes.string,
    cost: PropTypes.arrayOf(PropTypes.string),
    text: PropTypes.string,
    damage: PropTypes.string,
  }).isRequired,
};
Type.propTypes = {
  type: PropTypes.string.isRequired,
};
PokemonInfo.propTypes = {
  pokemon: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    image: PropTypes.string,
    hp: PropTypes.string,
    types: PropTypes.arrayOf(PropTypes.string),
    attacks: PropTypes.arrayOf(PropTypes.any),
  }).isRequired,
};
export default PokemonInfo;
