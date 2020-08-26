import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import PokemonThumbNail from './PokemonThumbnailComponent';

function Pagination({ totalPages, active, setPage }) {
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
      <li className="page-item" key="next">
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
}

export default function Home({ totalPokemon, queryPokemons }) {
  const [page, setPage] = useState(1);
  const maxPokemonShown = 12;
  const numPages = Math.ceil(totalPokemon / maxPokemonShown);

  const pokemonList = queryPokemons(page, maxPokemonShown)
    .map((pokemon) => <PokemonThumbNail key={pokemon.id} pokemon={pokemon} />);

  return (
    <div className="row">
      <h3 className="col-12">Catalogo de Pokemons</h3>
      <hr className="col-10 mx-auto" />
      <div className="col-12 d-flex justify-content-center">
        <Pagination totalPages={numPages} active={page} setPage={setPage} />
      </div>

      {pokemonList}
    </div>
  );
}

Pagination.propTypes = {
  totalPages: PropTypes.number.isRequired,
  active: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
};
Home.propTypes = {
  totalPokemon: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
  })).isRequired,
  queryPokemons: PropTypes.func.isRequired,
};
