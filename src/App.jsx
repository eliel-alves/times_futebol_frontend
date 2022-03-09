import 'bootstrap/dist/css/bootstrap.min.css';
import '@popperjs/core/dist/cjs/popper.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Menu from './components/Menu';
import Home from './components/Home';
import Time from './components/time/Time';
import Posicao from "./components/posicao/Posicao";
import Jogador from "./components/jogador/Jogador";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from 'react';
import './App.css';

function App() {
  return (
    <Router>
      <Menu/>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/times" element={<Time/>}/>
        <Route exact path="/jogadores" element={<Jogador/>}/>
        <Route exact path="/posicoes" element={<Posicao/>}/>
      </Routes>
    </Router>
  );
}

export default App;
