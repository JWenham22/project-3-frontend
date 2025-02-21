// src/components/Dashboard/Dashboard.jsx
import './Dashboard.css';
import { useEffect, useContext, useState } from 'react';
import { UserContext } from '../../contexts/UserContext';
import Projects from '../Projects/Projects';

import * as userService from '../../services/userService';
import * as projectService from '../../services/projectService';

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const [projects, setProjects] = useState([])
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
        console.log(fetchedProjects);
        const userProjects = fetchedProjects.filter((project) => project.user._id = user._id)
        console.log(userProjects)
        setProjects(userProjects)
      } catch (err) {
        console.log(err)
      }
    }
    fetchProjects()
    console.log(projects)

  }, [user.username]); // this useEffect is running when component loads, or when the value
  // of user changes


  return (
    <main className='projects-container'>
      <h1>Welcome, {user.username}</h1>
      <Projects />
    </main>
  );
};

export default Dashboard;

