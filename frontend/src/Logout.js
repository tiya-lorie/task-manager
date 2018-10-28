import React, { Component } from 'react';
import './App.css';
import LogoutModal from './LogoutModal';

class Logout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showPopup: false
    };
  }

  togglePopup = () => this.setState(state => ({ showPopup: !state.showPopup }));

  render() {
    const {
      state: { showPopup },
      togglePopup
    } = this;

    return (
      <div div className='log-div'>
        <span className='sign-up' onClick={ togglePopup }>Log out</span>
        {
          showPopup ? 
            <LogoutModal
              closePopup={ togglePopup }
            />
          : null
        }        
      </div>
    );
  }
}

export default Logout;