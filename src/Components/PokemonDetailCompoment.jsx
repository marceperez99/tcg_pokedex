import React from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import pokemonTypes from '../shared/pokemon_types_logos';
import notFound from '../images/notFound.png';

export default function PokemonDetail({ pokemon }) {
  if (!pokemon) {
    return (
      <div className="row">
        <div className="col-12"><Link className="btn  btn-outline-primary" to="/pokemon">Volver atrás</Link></div>
        <div className="col-6 col-md-3 my-4">
          <img src={notFound} className="col-12" alt="" />
        </div>
        <div className="col-6 col-md-9 align-self-center h2">Pokemon no encontrado</div>
      </div>
    );
  }

  const types = pokemon.types.map((type) => (
    <h4 key={type}>
      <span className="badge badge-pill badge-light border">
        <img src={pokemonTypes[type.toLowerCase()]} alt="" />
        {`  ${type}`}
      </span>
    </h4>
  ));

  const attacks = pokemon.attacks.map((attack) => {
    const elementCosts = {};
    attack.cost.forEach((element) => {
      elementCosts[element] = elementCosts[element] ? elementCosts[element] + 1 : 1;
    });

    const cost = Object.entries(elementCosts).map(([element, nroNecesitado]) => (
      <>
        <span style={{ margin: '10px' }}>{nroNecesitado}</span>
        <img key={`${attack}_${element}`} src={pokemonTypes[element.toLowerCase()]} alt={element.toLowerCase()} />
      </>
    ));
    return (
      <div key={attack} className="card my-2">
        <div className="card-body row">
          <h6 className="col-12">{attack.name}</h6>
          <hr className="col-10" />
          <h6 className="col-12 col-md-4">Costo</h6>
          <p className="col-12 col-md-8">{cost}</p>
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
  });
  return (
    <div className="row">
      <div className="col-2"><Link className="btn  btn-outline-primary" to="/pokemon">Volver atrás</Link></div>
      <div className="col-8 h3 text-center">{pokemon.name}</div>
      <hr className="col-10 mx-auto" />
      <div className="col-10 col-sm-4">
        <img src={pokemon.image} className="col-12" alt="" />
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
    </div>
  );
}
PokemonDetail.propTypes = {
  pokemon: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    image: PropTypes.string,
    hp: PropTypes.string,
    types: PropTypes.arrayOf(PropTypes.string),

    attacks: PropTypes.arrayOf(PropTypes.any),
  }).isRequired,
};
