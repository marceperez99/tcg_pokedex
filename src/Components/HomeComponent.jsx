import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import PokemonThumbNail from './PokemonThumbnailComponent';
import PokemonFilter from './PokemonFilterComponent';
/**
 * Componente que muestra la paginación de la lista de Pokemons
 * y permite la navegación sobre esta lista.
 * @param {Object} props - Propiedades del Componente.
 * @param {number} props.totalPages - Número de páginas de la paginación
 * @param {number} props.active - Número de pagina en la que se encuentra el usuario.
 * @param {function} props.setPage - Función que permite cambiar el número de pagina
 * en la que se encuentra el usuario.
 */
const Pagination = ({ totalPages, active, setPage }) => {
  const items = [];
  for (let i = 1; i <= totalPages; i += 1) {
    let item;
    if (i === active) {
      item = (
        <li className="page-item active" key={i}>
          <button type="button" onClick={() => setPage(i)} className="page-link">{i}</button>
        </li>
      );
    } else {
      item = (
        <li className="page-item" key={i}>
          <button type="button" onClick={() => setPage(i)} className="page-link">{i}</button>
        </li>
      );
    }
    items.push(item);
  }
  return (
    <ul className="pagination">
      <li className="page-item" key="previous">
        <button type="button" onClick={() => setPage(Math.max(active - 1, 1))} className="page-link">
          <span aria-hidden="true">&laquo;</span>
          <span className="sr-only">Previous</span>
        </button>
      </li>
      {items}
      <li className="page-item" key="next">
        <button type="button" onClick={() => setPage(Math.min(active + 1, totalPages))} className="page-link">
          <span aria-hidden="true">&raquo;</span>
          <span className="sr-only">Next</span>
        </button>
      </li>
    </ul>
  );
};
/**
 * Componente que muestra la lista de Pokemons obtenida por la API y
 * contiente un buscador de Pokemons por nombre.
 * Dentro del Componente se mantiene el estado del numero de pagina actual
 * en la que se encuentra el usuario.
 * @param {Object} props - Propiedades del Componente.
 * @param {number} props.totalPokemon - Número total de pokemons a mostrar
 * @param {function} props.queryPokemons - Función que permite obtener la lista de pokemons
 * que pertenece a cada pagina de la paginación.
 * @param {function} props.filterPokemons - Función que permite filtrar de la lista de pokemons
 * todos aquellos que contenga una cadena en su nombre.
 */
const Home = ({ totalPokemon, queryPokemons, filterPokemons }) => {
  const [page, setPage] = useState(1);
  const maxPokemonShown = 12;
  const numPages = Math.ceil(totalPokemon / maxPokemonShown);

  const pokemonList = queryPokemons(page, maxPokemonShown)
    .map((pokemon) => <PokemonThumbNail key={pokemon.id} pokemon={pokemon} />);

  return (
    <div className="row">
      <h3 className="col-12">Catalogo de Pokemons</h3>
      <hr className="col-10 mx-auto" />
      <div className="col-12">

        <PokemonFilter key="searchbar" filterPokemons={filterPokemons} />
      </div>
      <div className="col-12 d-flex justify-content-center">
        <Pagination totalPages={numPages} active={page} setPage={setPage} />
      </div>

      {pokemonList.length ? pokemonList : <h2 className="col-12 text-center text-secondary">No hay pokemons que mostrar</h2>}
    </div>
  );
};

Pagination.propTypes = {
  totalPages: PropTypes.number.isRequired,
  active: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
};
Home.propTypes = {
  totalPokemon: PropTypes.number.isRequired,
  queryPokemons: PropTypes.func.isRequired,
  filterPokemons: PropTypes.func.isRequired,
};

export default Home;
