import React, { Component } from 'react';
import { shape, string, func, number } from 'prop-types';
import TaskUpdate from './TaskUpdate';

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

class TaskModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isUpdate: false,
      project_id: props.project_id
    };
  }

  openUpdateModal = () => this.setState(state => ({ isUpdate: !state.isUpdate }));

  render() {
    const {
      props: { task, closePopup },
      state: { isUpdate, project_id },
      openUpdateModal
    } = this;
    
    return (
      <div className='popup'>
        <div className='popup-inner'>
          <div className='close-popup' onClick={ closePopup }>X</div>
          <div className='modal-title'>Project</div>
          <div className= 'project-modal'>
            <div className='title'>{ task.title }</div>
            <div className='description'>{ task.description }</div>
            <div className='status'>{ task.status }</div>
          </div>
          <div className='update-delete-flex'>
            <div className='update-wrapper'>
              <span className='update' onClick={ openUpdateModal }>Update or Delete</span>
            </div>
          </div>
          isUpdate ?
            <TaskUpdate
              { ...{ closePopup, task, project_id } }
            />
            : 
            null
          }
        </div>
      </div>
    );
  }
}

TaskModal.propTypes = propTypes;

export default TaskModal;
