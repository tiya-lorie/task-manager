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
  task: shape ({
    id: number.isRequired,
    title: string.isRequired,
    description: string.isRequired,
    status: string.isRequired
  }).isRequired,
  project_id: number.isRequired,
  closePopup: func.isRequired
};

class TaskUpdate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: props.task.title,
      description: props.task.description,
      status: props.task.status,
      project_id: props.project_id
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
      state: { title, description, status, project_id },
      updateTask
    } = this;

    updateTask(title, description, status, project_id);
  };

  updateTask = (title, description, status, project_id) => {
    var url = 'http://localhost:3000/api/v1/users/tasks/' + this.props.task.id;
    return fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'WWJo2uVGlPlwRMlNlc6GHw' },
      body: JSON.stringify({ title: title, description: description, status: status.value, project_id: project_id })
    }).then(response => {
      return response;
    }).catch(err => err);
  };

  deleteTask = (project_id) => {
    var url = 'http://localhost:3000/api/v1/users/tasks/' + this.props.task.id + '?project_id=' + this.props.project_id;
    return fetch(url, {
      method: 'DELETE',
      headers: { 'Authorization': 'WWJo2uVGlPlwRMlNlc6GHw' }
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
      handleSubmit,
      deleteTask
    } = this; 

    return (
      <div className='popup'>
        <div className='popup-inner'>
          <div className='close-popup' onClick={ closePopup }>X</div>
          <span className='create-project-title'>Update task</span>
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
            <span className='delete' onClick={ () => deleteTask() }>Delete task</span>
            <span className='update submit' onClick={ () => handleSubmit() }>Save</span>
          </form>
        </div>
      </div>
    );
  }
}

TaskUpdate.propTypes = propTypes;

export default TaskUpdate;