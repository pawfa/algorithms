import React, { Component } from 'react';
import './App.css';
import SeriesInputContainer from './containers/SeriesInputContainer'
import SeriesPresentationContainer from './containers/SeriesPresentationContainer'
import GraphContainer from './containers/GraphContainer'

class App extends Component {
  render() {
    return (
      <div className="App">
          <SeriesInputContainer/>
          <GraphContainer/>
          <SeriesPresentationContainer/>
      </div>
    );
  }
}

export default App;
