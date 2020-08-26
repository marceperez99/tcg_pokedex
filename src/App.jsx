import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Header from './Components/HeaderComponent';
import Main from './Components/MainComponent';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Main />
    </BrowserRouter>
  );
}

export default App;
