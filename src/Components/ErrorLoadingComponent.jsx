import React from 'react';

/**
 * Componente funcional que muestra mensaje de error al usuario cuando no se es posible
 * obtener la lista de pokemons de la API.
 * Este componente no recibe props
 */
const ErrorLoading = () => (

  <div className="row">
    <div className="col-auto mx-auto text-justify text-secondary">
      <h2>Ha ocurrido un error al tratar de obtener los datos de los Pokemons.</h2>
    </div>
  </div>
);
export default ErrorLoading;
