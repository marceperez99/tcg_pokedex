import React from 'react';
import logo from '../images/logo.png';

export default function Header() {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="row">
        <img src={logo} className="col-2 offset-1" alt="Pokemon Logo" />
        <span className=" col-auto navbar-brand my-auto">TCG Pokedex</span>
      </div>
    </nav>
  );
}
