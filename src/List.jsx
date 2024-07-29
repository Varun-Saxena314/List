import React, {useState} from 'react';

function List() { 
    const [tasks, setTasks] = useState(["Lettuce"]);
    const [newTask, setNewTask] = useState("");

    function inputChange(event){
        setNewTask(event.target.value);
    }
    function addToList(){
        if (newTask.trim() !== ''){
        setTasks(t => [...t, newTask]);
        setNewTask("");
        }
    }
    function removeFromList(index){
        const updateTasks = tasks.filter((_, i) => i !== index)
        setTasks(updateTasks);
    }
    function moveItemUp(index){
        if(index > 0){
            const updatedTasks =[...tasks];
            [updatedTasks[index], updatedTasks[index-1]] = [updatedTasks[index-1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }
    function moveItemDown(index){
        if(index < tasks.length -1){
            const updatedTasks =[...tasks];
            [updatedTasks[index], updatedTasks[index+1]] = [updatedTasks[index+1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }
return (
    <div className='list'>
        <h1 className='title'>List by </h1>
        <h1 className='me'>Varun Saxena</h1>
        <div className='inputBar'>
            <input
                type = 'text' placeholder='Enter an item...' value={newTask}
                onChange={inputChange}
            />
            <button className='addTask' onClick = {() => addToList()}>Add item</button>
        </div>

        <ol className='box'>
            {tasks.map((task, index) =>
                <li key={index}>
                    <span className='text'>{task}</span>
                    <button className='deleteTask' onClick={() => removeFromList(index)}>Remove</button>
                    <button className='upTask' onClick={() => moveItemUp(index)}>Up</button>
                    <button className='downTask' onClick={() => moveItemDown(index)}>Down</button>
                </li>
            )}
        </ol>

    </div>
);
}
export default List;