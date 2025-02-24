import { useState } from 'react';

const initialState = {
  name: '',
  description: '',
  priority: 'low',
  category: 'general'
};

const TaskForm = (props) => {
  const [ formData, setFormData ] = useState({
    name: '',
    description: '',
    priority: 'low',
    category: 'general'
  });

  console.log(props);

  const handleChange = (e) => {
    setFormData({
        ...formData, 
        [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
      e.preventDefault();
      formData.isComplete = 'false';
      props.addTask(props.currentProject._id, formData);
      setFormData(initialState);
  };

  return (
      <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title">Task name:</label>
            <input type="text" name='name' id='name' value={formData.name} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <input type="text" name='description' id='description' value={formData.description} onChange={handleChange} />
          </div>
          <select 
            id="priority" 
            name="priority" 
            value={formData.priority} 
            onChange={handleChange}
          >
            <option defaultValue='low'>low</option>
            <option value='normal'>normal</option>
            <option value='high'>high</option>
          </select>
          <select 
            id="category" 
            name="category" 
            value={formData.category} 
            onChange={handleChange}
          >
            <option defaultValue='general'>general</option>
            <option value='backend'>backend</option>
            <option value='frontend'>frontend</option>
          </select>
          <div><button type="submit">Add Task</button></div>
      </form>
  );
};

export default TaskForm;
