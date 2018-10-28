import React, { Component } from 'react';
import './App.css';
import ProjectItem from './ProjectItem';
import ProjectCreatePopup from './ProjectCreatePopup';

const propTypes = {
};

class Projects extends Component {
 constructor(props) {
    super(props);

    this.state = {
      projects: [],
      showPopup: false
    };
  }

  togglePopup = () => this.setState(state => ({ showPopup: !state.showPopup }));

  componentDidMount() {
    fetch('http://localhost:3000/api/v1/users/projects', {
      method: 'GET',
      headers: { 'Authorization': 'WWJo2uVGlPlwRMlNlc6GHw' }
    })
      .then(response => response.json())
      .then(data => this.setState({ projects: data.projects }));
  }

  render() {
    const {
      state: { projects, showPopup },
      togglePopup
    } = this;

    return (
      <div className='projects-list'>
        {
          projects.map(project => (
            <ProjectItem
              key={ project.id }
              { ...{ project } }
            />
          ))
        }
        <div className="add-project" onClick={ togglePopup }>+</div>
        { showPopup ?
          <ProjectCreatePopup
            closePopup={ togglePopup }
          />
          : null
        }
      </div>      
    );
  }
}

Projects.propTypes = propTypes;

export default Projects;