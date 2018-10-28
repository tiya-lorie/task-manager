import React, { Component } from 'react';
import './App.css';
import Logout from './Logout';
import Loginization from './Loginization';
import cookie from 'react-cookies';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: cookie.load('token')
    };
  }

  render() {
    const {
      state: { token }
    } = this;

    return (
      <div className='header'>
        <div className='header-title'>
          <span className='main-title'>Task manager</span>
          {
            token ?
              <Logout/>
            :
              <Loginization/>
          }          
        </div>        
      </div>
    );
  }
}

export default Header;