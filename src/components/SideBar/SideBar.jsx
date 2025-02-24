import ProjectForm from '../ProjectForm/ProjectForm'
import TaskForm from '../TaskForm/TaskForm';

import './SideBar.css'

const SideBar = (props) => {
    return (
        <div className='sidebar-container'>
          {props.currentProject === null ? (
            <div>
              <h2>Add a Project</h2>
              <ProjectForm createProject={props.createProject}/>
            </div>
          ) : (
            <div>
              <h2>Add task to {props.currentProject.title}</h2>
              <TaskForm currentProject={props.currentProject} setCurrentProject={props.setCurrentProject} addTask={props.addTask} />
            </div>
          )}
        </div>
    );
}

// export default Sidebar;

export default SideBar