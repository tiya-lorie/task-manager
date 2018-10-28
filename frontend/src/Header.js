import React, { Component } from 'react';
import './App.css';
import SignUpModal from './SignUpModal';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showSignUp: false
    };
  }

  toggleSignUp = () => this.setState(state => ({ showSignUp: !state.showSignUp }));

  render() {
    const {
      state: { showSignUp },
      toggleSignUp
    } = this;

    return (
      <div className='header'>
        <div className='header-title'>
          <span className='main-title'>Task manager</span>
          <span className='sign-up' onClick={ toggleSignUp }>Sign in</span>
        </div>
        {
          showSignUp ? 
            <SignUpModal
              closePopup={ toggleSignUp }
            />
          : null
        }        
      </div>
    );
  }
}

export default Header;