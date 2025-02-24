
// import { useState, useEffect } from 'react'
// import { useParams } from 'react-router-dom'
// import * as projectService from '../../services/projectService'

const ProjectDetails = (props) => {
    // console.log(props)
    console.log(props);
    
    const categorizedTasks = props.currentProject.tasks.reduce((acc, task) => {
      if(!acc[task.category]) {
        acc[task.category] = [];
      } 

      acc[task.category].push(task);
      return acc;
    }, {})
    return (
       <div className="project-details-container">
        <main className="details-container">
            <h1>{props.currentProject.title}</h1>
            <p>{props.currentProject.description}</p>
            {/* <ul>
              {props.currentProject.tasks.map((task, index) => (
                <li key={index}>
                  {task.name}: {task.description}
                </li>
              ))}
            </ul>
             */}

            {Object.entries(categorizedTasks).map(([category, items]) => (
              <div key={category}>
                <h2>{category}</h2>
                <ul>
                  {items.map(task => (
                    <li key={task._id}>{task.name}: {task.description}</li>
                  ))}
                </ul>
              </div>
            ))}
            <button onClick={() => props.setCurrentProject(null)}>back</button>
        </main>
       </div>
    )
}

export default ProjectDetails;