import React, {useState, useRef} from 'react';
import Input from './components/Input';
import NavigationBar from './components/NavigationBar';
import TodoBase from './components/TodoBase';
import {FaTrashAlt, FaCheckSquare, FaEdit} from 'react-icons/fa';

const Todo = () => {
    const [todos, setTodos] = useState([]);
    const inputRef = useRef(null);

    const addTodos = (e) => {
        e.preventDefault();
        setTodos([...todos,{todo: e.target[0].value, done:false}]);
        inputRef.current.value = "";
    }

    const editTodos = (todo) => {
        console.log(todo)
    }

    const deleteTodos = (idx) => {
        setTodos(todos.filter((v,i) => idx !== i));
    }

    const clearTodos = () => {
        setTodos([]);
    }

    const completeTodos = (idx) => {
        setTodos(todos.map((todo, i) => {
            if(idx === i){
                todo.done = true;
            }
        }));
    }

    const saveTodos = () => {
        console.log(todos);
    }

    return(
        <div className='parent-wrapper'>
            <NavigationBar>
                <h1>Todo List</h1>
            </NavigationBar>
            <Input 
                handleSubmit={addTodos} 
                inputRef={inputRef} 
                clearTodos={clearTodos}
                saveTodos={saveTodos}
            />
            <TodoBase>
               <ul>
                {todos.map((v,i) => {
                    return(
                        <li key={i}>
                            {v.todo}
                            <button className='delete' onClick={() => deleteTodos(i)}><FaTrashAlt/></button>
                            <button className='edit' onClick={() => editTodos(v)}><FaEdit/></button>
                            <button className='done'onClick={() => completeTodos(i)}><FaCheckSquare/></button>
                        </li>
                    )
                })}
               </ul>
            </TodoBase>
        </div>
    );
}

export default Todo;