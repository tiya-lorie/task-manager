import React, { Component } from 'react';
import { shape, string, func, number } from 'prop-types';
import './App.css';
import TaskItem from './TaskItem';
import TaskCreatePopup from './TaskCreatePopup';
import cookie from 'react-cookies';

const propTypes = {
  project: shape ({
    id: number.isRequired,
    title: string.isRequired,
    description: string.isRequired,
    status: string.isRequired
  }).isRequired
};

class Tasks extends Component {
 constructor(props) {
    super(props);

    this.state = {
      tasks: [],
      showPopup: false,
      token: cookie.load('token')
    };
  }

  togglePopup = () => this.setState(state => ({ showPopup: !state.showPopup }));

  componentDidMount() {
    var url = 'http://localhost:3000/api/v1/users/projects/' + this.props.project.id + '/tasks';
    fetch(url, {
      method: 'GET',
      headers: { 'Authorization': this.state.token }
    })
      .then(response => response.json())
      .then(data => this.setState({ tasks: data.tasks }));
  }

  render() {
    const {
      props: { project },
      state: { tasks, showPopup },
      togglePopup
    } = this;

    return (

      <div className='tasks-list'>
        <div className='modal-title'>Tasks</div>
        {
          tasks.map(task => (
            <TaskItem
              key={ task.id }
              { ...{ task, project } }
            />
          ))
        }
        <div className="add-task" onClick={ togglePopup }>+</div>
        { showPopup ?
          <TaskCreatePopup
            closePopup={ togglePopup }
            { ...{ project } }
          />
          : null
        }
      </div>      
    );
  }
}

Tasks.propTypes = propTypes;

export default Tasks;