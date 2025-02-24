// src/components/Dashboard/Dashboard.jsx
import './Dashboard.css';
import { useEffect, useContext, useState } from 'react';
import { UserContext } from '../../contexts/UserContext';
import Projects from '../Projects/Projects';
import SideBar from '../SideBar/SideBar';

import * as userService from '../../services/userService';
import * as projectService from '../../services/projectService';


const Dashboard = () => {
  const { user } = useContext(UserContext);
  const [projects, setProjects] = useState([]);
  const [currentProject, setCurrentProject] = useState(null);
  

  useEffect(() => {

    // THIS IS AN EXAMPLE OF AN API CALL 
    // AFTER YOU ARE LOGGED IN, PLEASE LOOK AT THE USERSERVICE
    // HEADERS FOR SENDING THE JWT TOKEN OVER


    const fetchUsers = async () => {
      try {
        const fetchedUsers = await userService.index();
        console.log(fetchedUsers);
      } catch (err) {
        console.log(err)
      }
    }
    if (user) fetchUsers();


    const fetchProjects = async () => {
      try {
        const fetchedProjects = await projectService.index();
        const userProjects = fetchedProjects.filter((project) => project.user._id === user._id);
        setProjects(userProjects);
        
      } catch (err) {
        console.log(err)
      }
    }
    fetchProjects();
    

  }, [user.username]); // this useEffect is running when component loads, or when the value
  // of user changes

  const createProject = async (projectFormData) => {
    try {
      const newProject = await projectService.create(projectFormData)
      setProjects([...projects, newProject])

    } catch (err) {
      console.log(err)
    }
  }

  const addTask = async (projectId, formData) => {
    const newTask = await projectService.createTask(projectId, formData);
    const newCurrentProject = { ...currentProject, tasks: [...currentProject.tasks, newTask]}
    setCurrentProject(newCurrentProject);
    

    const updatedProjectList = projects.map((project) => (
      project._id !== currentProject._id ? project : newCurrentProject
    ));
    setProjects(updatedProjectList);
  }
  
  return (
    <div className="main-container">
      <main className='projects-container'>
        <h1>Welcome, {user.username}</h1>
        <Projects projects={projects} setCurrentProject={setCurrentProject} currentProject={currentProject} />
      </main>
      <div className="sidebar-container">
        <SideBar createProject={createProject} currentProject={currentProject} setCurrentProject={setCurrentProject} addTask={addTask} />
      </div>
    </div>
  );
};

export default Dashboard;