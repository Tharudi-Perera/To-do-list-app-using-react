import React, {useState} from 'react';


function ToDoList() {

    const [task, setTask] = useState(["Eat Breakfast", "Take a Shower", "Go to Work"]);
    const [newTask, setNewTask] = useState("");

    const currentDate = new Date().toLocaleDateString(); // Get current date in a readable format (MM/DD/YYYY)

    function handleInputChange(event) {
        setNewTask(event.target.value);
    }   

    function addTask() {

        if(newTask.trim() !== "") { // Check if the input is not empty, After removing whitespace check whether 
            setTask([...task, newTask]); // Add the new task to the list while keeping existing tasks
            setNewTask(""); // Clear the input field after adding the task
        } 
        
    }

    function deleteTask(index) {
        const updatedTasks = task.filter((_, i) => i !== index); 
        // Filter out the task at the given index means get only the tasks that are not at the index to be deleted
        setTask(updatedTasks); // Update the state with the new list of tasks
    }

    function moveTaskUp(index) {
        if (index > 0) { // Check if the task is not already at the top
            const updatedTasks = [...task]; // Create a copy of the current tasks
            [updatedTasks[index], updatedTasks[index - 1]] = 
            [updatedTasks[index - 1], updatedTasks[index]]; // Swap the task with the one above it
            setTask(updatedTasks); // Update the state with the new order of tasks
        }
    
    }

    function moveTaskDown(index) {
        if(index < task.length - 1) { // Check if the task is not already at the bottom
            const updatedTasks = [...task]; // Create a copy of the current tasks
            [updatedTasks[index], updatedTasks[index + 1]] =
            [updatedTasks[index + 1], updatedTasks[index]]; // Swap the task with the one below it
            setTask(updatedTasks); // Update the state with the new order of tasks
    }
}


    return(<div className="to-do-list">

        <h1>To-Do List</h1>

        {/* Current Date Section */}
            <div className="date-container">
                <span className="current-date">{currentDate}</span>
            </div>
    
        {/* Task Input Section */}
            <div className="input-container">
                <input
                    type="text"
                    value={newTask}
                    onChange={handleInputChange}
                    placeholder="Add a new task..."
                />
                <button className="add-button" onClick={addTask}>
                    Add Task
                </button>
            </div>

        <ol>
            {task.map((task, index) => (
                <li key={index}>
                    <span className='text'>{task}</span>
                    
                    <button className='delete-button' 
                    onClick={() => deleteTask(index)}>Delete</button>

                    <button className='move-button' 
                    onClick={() => moveTaskUp(index)}>Move Up</button>

                    <button className='move-button' 
                    onClick={() => moveTaskDown(index)}>Move Down</button>
                </li>
            ))}
        </ol>


    </div>);

}

export default ToDoList;