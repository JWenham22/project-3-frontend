// import { Link } from 'react-router'

const ProjectList = (props) => {
    return(
        <ul>
           <h1>Projects</h1>
             {props.projects.map((project) => (
               <li key={project._id}  onClick={() => props.setCurrentProject(project)}>
                   {project.title}
                   <br />
                   {project.description}
               </li>
             ))}
        </ul>
    );
}

export default ProjectList;