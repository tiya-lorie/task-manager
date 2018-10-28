import React, { Component } from 'react';
import { shape, string } from 'prop-types';
import './App.css';
import ProjectModal from './ProjectModal';

const propTypes = {
  project: shape ({
    title: string.isRequired,
    description: string.isRequired,
    status: string.isRequired
  }).isRequired
};

class ProjectItem extends Component {
  constructor(props) {
    super(props);

    this.state = { showPopup: false };
  }

  togglePopup = () => this.setState(state => ({ showPopup: !state.showPopup }));

  render() {
    const {
      props: { project },
      state: { showPopup },
      togglePopup
    } = this;

    return (
      <div className='project-item'>
        <div className='title'>{ project.title }</div>
        <div className='description'>{ project.description }</div>
        <div className='status'>{ project.status }</div>
        <div className='open-modal' onClick={ togglePopup }>...</div>
        { showPopup ? 
          <ProjectModal
            closePopup={ togglePopup }
            { ...{ project } }
          />
          : null
        }
      </div>
    );
  }
}

ProjectItem.propTypes = propTypes;

export default ProjectItem;