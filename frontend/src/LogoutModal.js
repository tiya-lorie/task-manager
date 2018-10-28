import React, { Component } from 'react';
import { func } from 'prop-types';
import './App.css';
import cookie from 'react-cookies';

const propTypes = {
  closePopup: func.isRequired
};

class LogoutModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: cookie.load('token')
    }
  }

  handleSubmit = () => {
    const {
      state: { token },
      deleteSession,
      removeToken
    } = this;

    deleteSession();
    removeToken(token);
  };

  deleteSession = () => {
    return fetch('http://localhost:3000/api/v1/users/sessions', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', 'Authorization': this.state.token }
    }).then(response => {
      return response;
    }).catch(err => err);
  };

  removeToken = (token) => {
    cookie.remove('token', { path: '/' })
  }

  render() {
    const {
      props: { closePopup },
      handleSubmit
    } = this;
    
    return (
      <div className='popup'>
        <div className='popup-inner popup-inner-sign'>
          <div className='modal-title'>Do you want log out?</div>          
            <span className='sign-up-btn' onClick={ closePopup }>No</span>
            <span className='log-in-btn' onClick={ () => handleSubmit() }>Yes</span>
        </div>
      </div>
    );
  }
}

LogoutModal.propTypes = propTypes;

export default LogoutModal;