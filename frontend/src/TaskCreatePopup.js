import React, { Component } from 'react';
import { shape, string, func, number } from 'prop-types';
import Select from 'react-select';

const STATUSES = [
  { value: 'new', label: 'New' },
  { value: 'started', label: 'Started' },
  { value: 'paused', label: 'Paused' },
  { value: 'done', label: 'Done' },
];

const propTypes = {
  project: shape ({
    id: number.isRequired,
    title: string.isRequired,
    description: string.isRequired,
    status: string.isRequired
  }).isRequired,
  closePopup: func.isRequired
};

class TaskCreatePopup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      description: '',
      status: ''
    };
  }

  handleChangeTitle = ({ target: { value } }) => {
    this.setState({ title: value}); 
  };

  handleChangeDescription = ({ target: { value } }) => {
    this.setState({ description: value });
  };

  handleChangeStatus = (status) => {
    this.setState({ status });
  };

  handleSubmit = () => {
    const {
      state: { title, description, status },
      createTask,
      closePopup
    } = this;

    createTask(title, description, status);
  };

  createTask = (title, description, status) => {
    var url = 'http://localhost:3000/api/v1/users/projects/' + this.props.project.id + '/tasks';
    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'WWJo2uVGlPlwRMlNlc6GHw' },
      body: JSON.stringify({ title: title, description: description, status: status.value })
    }).then(response => {
      return response;
    }).catch(err => err);
  };

  render() {
    const {
      props: { closePopup },
      state: { title, description, status },
      handleChangeTitle,
      handleChangeDescription,
      handleChangeStatus,
      handleSubmit
    } = this; 

    return (
      <div className='popup'>
        <div className='popup-inner'>
          <div className='close-popup' onClick={ closePopup }>X</div>
          <span className='create-project-title'>Create new task</span>
          <form className='create-form'>
            <label className='create-item'>
              <span className='create-title'>Title</span>
              <input
                type = 'text'
                value={ title }
                onChange={ handleChangeTitle }
              />
            </label>
            <label className='create-item'>
              <span className='create-description'>Description</span>
              <textarea
                type = 'text'
                value={ description }
                onChange={ handleChangeDescription }
              />
            </label>
            <label className='create-item'>
              <span className='create-status'>Status</span>
              <Select
                placeholder='Please select...'
                value={ status }
                options={ STATUSES }
                clearable={ false }
                onChange={ handleChangeStatus }
              />
            </label>
            <span className='update submit' onClick={ () => handleSubmit() }>Save</span>
          </form>
        </div>
      </div>
    );
  }
}

TaskCreatePopup.propTypes = propTypes;

export default TaskCreatePopup;