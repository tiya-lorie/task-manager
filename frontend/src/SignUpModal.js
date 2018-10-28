import React, { Component } from 'react';
import { func } from 'prop-types';
import './App.css';
import cookie from 'react-cookies'

const propTypes = {
  closePopup: func.isRequired
};

class SignUpModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
      token: ''
    };
  }

  handleChangeName = ({ target: { value } }) => {
    this.setState({ name: value}); 
  };

  handleChangeEmail = ({ target: { value } }) => {
    this.setState({ email: value });
  };

  handleChangePassword = ({ target: { value } }) => {
    this.setState({ password: value });
  };

  handleSubmit = () => {
    const {
      state: { name, email, password, token },
      createUser,
      createSession,
      setToken
    } = this;

    createUser(name, email, password);
    createSession(email, password);
    setToken(token);
  };

  handleLogin = () => {
    const {
      state: { name, email, password, token },
      createUser,
      createSession,
      setToken
    } = this;

    createSession(email, password);
    setToken(token);
  };

  createUser = (name, email, password) => {
    return fetch('http://localhost:3000/api/v1/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name, email: email, password: password })
    }).then(response => {
      return response;
    }).catch(err => err);
  };

  createSession = (email, password) => {
    return fetch('http://localhost:3000/api/v1/users/sessions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email, password: password })
    }).then(response => response.json())
      .then(data => this.setState({ token: data.token }));
  }

  setToken = (token) => {
    cookie.save('token', token, { path: '/' })
  }

  render() {
    const {
      props: { closePopup },
      state: { name, email, password },
      handleChangeName,
      handleChangeEmail,
      handleChangePassword,
      handleSubmit,
      handleLogin
    } = this;
    
    return (
      <div className='popup'>
        <div className='popup-inner popup-inner-sign'>
          <div className='close-popup' onClick={ closePopup }>X</div>
          <div className='modal-title'>Sign Up or Sign in</div>
          <form className='create-form'>
            <label className='create-item'>
              <span className='create-title'>Name</span>
              <input
                type = 'text'
                value={ name }
                onChange={ handleChangeName }
              />
            </label>
            <label className='create-item'>
              <span className='create-title'>Email</span>
              <input
                type = 'text'
                value={ email }
                onChange={ handleChangeEmail }
              />
            </label>
            <label className='create-item'>
              <span className='create-pass'>Password</span>
              <input
                type = 'text'
                value={ password }
                onChange={ handleChangePassword }
              />
            </label>
            <span className='sign-up-btn' onClick={ () => handleSubmit() }>Sign up</span>
            <span className='log-in-btn' onClick={ () => handleLogin() }>Sign in</span>
          </form>
        </div>
      </div>
    );
  }
}

SignUpModal.propTypes = propTypes;

export default SignUpModal;