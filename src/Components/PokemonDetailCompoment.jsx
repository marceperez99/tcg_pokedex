import React from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import notFound from '../images/notFound.png';
import PokemonInfo from './PokemonInfoComponent';
/**
 * Componente funcional que muestra un mensaje para hacer saber que no se encontró
 * un pokemon con el id especificado en la URL.
 * Este componente no recibe props.
 */
const NotFoundMessage = () => (
  <>
    <div className="col-6 col-md-3 my-4">
      <img src={notFound} className="col-12" alt={notFound} />
    </div>
    <div className="col-6 col-md-9 align-self-center h2">Pokemon no encontrado</div>
  </>
);
/**
 * Componente funcional que muestra el detalle de un Pokemon.
 * Si el id del pokemon especificado en la URL no existe entre los pokemon obtenidos de la API
 * se muestra un mensaje de error.
 * @param {Object} props - Propiedades del Componente.
 * @param {Object} props.pokemon - Objeto que contiene la informacion del Pokemon
 */
const PokemonDetail = ({ pokemon }) => (
  <div className="row">
    <div className="col-2"><Link className="btn  btn-outline-primary" to="/pokemon">Volver atrás</Link></div>
    <div className="col-8 h3 text-center">{pokemon ? pokemon.name : ''}</div>
    <hr className="col-10 mx-auto" />
    {!pokemon ? <NotFoundMessage /> : <PokemonInfo pokemon={pokemon} />}
  </div>
);
PokemonDetail.propTypes = {
  pokemon: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    image: PropTypes.string,
    hp: PropTypes.string,
    types: PropTypes.arrayOf(PropTypes.string),

    attacks: PropTypes.arrayOf(PropTypes.any),
  }),
};
PokemonDetail.defaultProps = {
  pokemon: undefined,
};

export default PokemonDetail;
