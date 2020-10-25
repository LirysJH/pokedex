import React, { Component } from 'react';
// import { Description } from './components/Description/Description';
import { Pokemons } from './components/Pokemons/Pokemons';
import { Title } from './components/Title/Title';
import './css/App.css';

export default class App extends Component {

  render() {
    return (
      <div className="App">
        <Title />
        <div className="block">
          <Pokemons />
          {/* <Description /> */}
        </div>
      </div>
    );
  }
}
