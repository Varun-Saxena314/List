import React, {useState, useEffect} from 'react';
import './index.css'

function List() { 
    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem('tasks');
        return savedTasks ? JSON.parse(savedTasks) : [];
    });
    const [newTask, setNewTask] = useState("");
    const [newQuantity, setNewQuantity] = useState("");

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    function inputChange(event){
        setNewTask(event.target.value);
    }
    function quantityChange(event){
        setNewQuantity(event.target.value);
    }
    function addToList(){
        let dup = false;
        if (isNaN(Number(newQuantity))) {
            alert("Quantity must be a number");
            return;
        }
        const updatedTasks = tasks.map(t => {
            if (t.name.toLowerCase() === newTask.toLowerCase()) {
                dup = true;
                return { ...t, quantity: Number(t.quantity) + Number(newQuantity) };
            }
            return t;
        });
        if (dup === true){
            setTasks(updatedTasks);
            setNewTask("");
            setNewQuantity("");
        }
        else if (newTask.trim() !== '' && newQuantity.trim() !== ''){
        setTasks(t => [...t, {name: newTask.substring(0,1).toUpperCase() + newTask.substring(1, newTask.length).toLocaleLowerCase(), quantity: newQuantity}]);
        setNewTask("");
        setNewQuantity("");
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
    function removeAll(){
        const refreshTasks = [];
        setTasks(refreshTasks);
    }
return (
    <div className='list'>
        <h1 className='title'>Grocery List by </h1>
        <h1 className='me'>Varun Saxena</h1>
        <div className='inputBar'>
            <input className='itemBar'
                type = 'text' placeholder='Enter an item...' value={newTask}
                onChange={inputChange}
            />
            <input className='quantBar'
                type = 'text' placeholder='#..' value={newQuantity}
                onChange={quantityChange}
            />
            <button className='addTask' onClick = {() => addToList()}>Add item</button>
            <button className='removeAll' onClick ={() => removeAll()}>Remove All</button>
        </div>

        <ol className='box'>
            {tasks.map((task, index) =>
                <li key={index}>
                    <span className='text'>{task.name}</span>
                    <div className='quantbox'>
                        <span className='line'></span>
                        <span className='quant'>How much: {task.quantity}</span>
                        <span className='line'></span>
                    </div>
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