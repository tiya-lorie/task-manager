import React, { Component } from 'react';
import './App.css';
import Header from './Header';
import Projects from './Projects';
import cookie from 'react-cookies';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: cookie.load('token')
    };
  }

  componentDidMount() {
    this.state =  { cookies: cookie.loadAll() }
    console.log(this.state.token)
  }

  render() {
    const {
      state: { token }
    } = this;

    return (
      <div className='App'>
        <Header/>
        {
          token ?
            <Projects/>
            :
            null
        }
      </div>
    );
  }
}

export default App;