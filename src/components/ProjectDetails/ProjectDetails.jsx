import { useState } from 'react'
import EditForm from '../EditForm/EditForm';

const ProjectDetails = (props) => {
    // console.log(props)
    console.log(props);
    const [editingProject, setEditingProject] = useState(false);

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
            {editingProject === true ? (
              <EditForm 
                currentProject={props.currentProject}
                editProject={props.editProject}
                setEditingProject={setEditingProject}
              />
            ) : (
              <div>
                <h1>{props.currentProject.title}</h1>
                <p>{props.currentProject.description}</p>
              </div>
            )}

            {Object.entries(categorizedTasks).map(([category, items]) => (
              <div key={category}>
                <h2>{category}</h2>
                <ul>
                  {items.map(task => (
                    <li key={task._id}>{task.name}: {task.description}
                      <button onClick={()=> props.deleteTask(task._id)}>X</button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <button onClick={() => props.setCurrentProject(null)}>back</button>
            <button onClick={() => setEditingProject(true)}>edit</button>
        </main>
       </div>
    )
}

export default ProjectDetails;