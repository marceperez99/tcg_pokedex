import React from 'react';
import logo from '../images/logo.png';
/**
 * Componente funcional que muestra el Header de la Pagina.
 * Este componente no recibe props.
 */
const Header = () => (
  <nav className="navbar navbar-dark bg-dark">
    <div className="row">
      <img src={logo} className="col-2 offset-1" alt="Pokemon Logo" />
      <span className=" col-auto navbar-brand my-auto">TCG Pokedex</span>
    </div>
  </nav>
);
export default Header;
