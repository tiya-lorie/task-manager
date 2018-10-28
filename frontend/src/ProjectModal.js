import React, { Component } from 'react';
import { shape, string, func, number } from 'prop-types';
import './App.css';
import Tasks from './Tasks';
import ProjectUpdate from './ProjectUpdate';

const propTypes = {
  project: shape ({
    id: number.isRequired,
    title: string.isRequired,
    description: string.isRequired,
    status: string.isRequired
  }).isRequired,
  closePopup: func.isRequired
};

class ProjectModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isUpdate: false
    };
  }

  openUpdateModal = () => this.setState(state => ({ isUpdate: !state.isUpdate }));

  render() {
    const {
      props: { project, closePopup },
      state: { isUpdate },
      openUpdateModal
    } = this;
    
    return (
      <div className='popup'>
        <div className='popup-inner'>
          <div className='close-popup' onClick={ closePopup }>X</div>
          <div className='modal-title'>Project</div>
          <div className= 'project-modal'>
            <div className='title'>{ project.title }</div>
            <div className='description'>{ project.description }</div>
            <div className='status'>{ project.status }</div>
          </div>
          <div className='update-delete-flex'>
            <div className='update-wrapper'>
              <span className='update' onClick={ openUpdateModal }>Update or Delete</span>
            </div>
          </div>
          {
            isUpdate ?
            <ProjectUpdate
              { ...{ closePopup, project } }
            />
            : 
            <Tasks
              {...{ project } }
            />
          }
        </div>
      </div>
    );
  }
}

ProjectModal.propTypes = propTypes;

export default ProjectModal;
