import React from 'react';

/**
 * Componente funcional que muestra un mensaje indicando que se estan consiguiendo
 * los datos de los pokemons de la API.
 * Este componente no recibe props.
 */
const Loading = () => (
  <div className="row">
    <div className="col-auto mx-auto text-secondary"><h1>Cargando...</h1></div>
  </div>
);

export default Loading;
