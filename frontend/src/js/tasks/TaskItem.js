import React, { Component } from 'react';
import { shape, string, number } from 'prop-types';
import TaskModal from './TaskModal';

const propTypes = {
  task: shape ({
    title: string.isRequired,
    description: string.isRequired,
    status: string.isRequired
  }).isRequired,
  project: shape ({
    id: number.isRequired
  }).isRequired
};

class TaskItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopup: false,
      project_id: props.project.id
    };
  }

  togglePopup = () => this.setState(state => ({ showPopup: !state.showPopup }));

  render() {
    const {
      props: { task },
      state: { showPopup, project_id },
      togglePopup
    } = this;

    return (
      <div className='task-item'>
        <div className='title'>{ task.title }</div>
        <div className='description'>{ task.description }</div>
        <div className='status'>{ task.status }</div>
        <div className='task-item-open' onClick={ togglePopup }>...</div>
        { showPopup ? 
          <TaskModal
            closePopup={ togglePopup }
            { ...{ task, project_id } }
          />
          : null
        }
      </div>
    );
  }
}

TaskItem.propTypes = propTypes;

export default TaskItem;