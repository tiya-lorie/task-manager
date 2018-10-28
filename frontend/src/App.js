import React, { Component } from 'react';
import './App.css';
import Header from './Header';
import Projects from './Projects';
import Cookies from 'js-cookie';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <Header/>
        <Projects/>
      </div>
    );
  }
}

export default App;