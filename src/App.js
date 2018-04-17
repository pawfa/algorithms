import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SeriesInputContainer from './containers/SeriesInputContainer'
import SeriesPresentationContainer from './containers/SeriesPresentationContainer'

class App extends Component {
  render() {
    return (
      <div className="App">
          <SeriesInputContainer/>
          <SeriesPresentationContainer/>

      </div>
    );
  }
}

export default App;
