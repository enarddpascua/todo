import React, {useState, useRef, useEffect} from 'react';
import Input from './components/Input';
import NavigationBar from './components/NavigationBar';
import TodoBase from './components/TodoBase';
import {FaTrashAlt, FaCheckSquare, FaEdit} from 'react-icons/fa';
import {AiOutlineCheck} from 'react-icons/ai';
import {ImCancelCircle} from 'react-icons/im';
import {BiErrorCircle} from 'react-icons/bi';
import {TbFidgetSpinner} from 'react-icons/tb';
import Modal from './components/Modal';

const Todo = () => {
    const [todos, setTodos] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editTodo, setEditTodo] = useState({todo:{}, index:0});
    const [isLoading, setIsLoading] = useState(false);
    const [isErr, setIsErr] = useState(false);
    const inputRef = useRef(null);
    // const url = "http://localhost:8080/todos";
    const url = "https://enard-simple-todoapp.herokuapp.com/todos";

    const addTodos = (e) => {
        e.preventDefault();
        setTodos([...todos,{todo: e.target[0].value, done:false, id: todos.length > 0 ?todos[todos.length - 1].id + 1 :
        todos.length + 1 }]);
        inputRef.current.value = "";
    }

    const editTodos = (event, todo, index) => {
        event.preventDefault();
        setShowModal(true);
        setEditTodo({todo, index});
    }

    const handleOnChangeEditTodo = (e, i) => {
        let editOnTodo = {
            todo: e.target.value,
            done: editTodo.todo.done,
        };
        setEditTodo({todo:editOnTodo, index: i});
    }

    const handleEditSubmit = (e, todoIndex) => {
        e.preventDefault();
        setShowModal(false);
        const newArr = todos.map((v,i) => {
            if(i === todoIndex){
                v.todo = editTodo.todo.todo;
            }
            return v;
        });
        setTodos(newArr);
    }

    const deleteTodos = (idx) => {
        setTodos(todos.filter((v,i) => idx !== i));
    }

    const clearTodos = () => {
        setTodos([]);
    }

    const completeTodos = (idx) => {
       const newArr = todos.map((todo, i) => {
            if(idx === i){
                todo.done = !todo.done;
            }
            return todo;
        });
        setTodos(newArr);
    }

    const saveTodos = () => {
        const reqBody = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(todos)
        };
        fetch(url, reqBody).then(res => {
            console.log(res.status);
        })

    }

    useEffect(() => {
        setIsLoading(true);
        fetch(url).then(response =>{
            if(response.ok){
                return response.json()
            }
            throw response;
        }).then(data => {
            setTodos(data);
        }).catch(err => {
            setIsErr(true);
        });
        setIsLoading(true);
    },[])

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
                        <li key={v.id} className={ v.done ? 'completed':''}>
                            {v.todo}
                            <button className='delete' onClick={() => deleteTodos(i)}><FaTrashAlt/></button>
                            <button disabled={v.done} className='edit' onClick={(e) => editTodos(e,v, i)}><FaEdit/></button>
                            <button className={v.done ? 'active-completed' : 'done'}onClick={() => completeTodos(i)}><FaCheckSquare/></button>
                        </li>
                    )
                })}
               </ul>
               {isErr && (
                <div className='status-indication'><BiErrorCircle/> Error getting your tasks</div>
                )}
                {isLoading && (
                    <div className='status-indication'>
                        <div className='spinner'><TbFidgetSpinner size={100}/></div>
                        Getting your tasks...
                    </div>
                )}
                {(todos.length === 0 && !isLoading && !isErr)  && (
                    <div className='status-indication'>
                        There's nothing to do here...
                    </div>
                )}
            </TodoBase>
            {showModal  && ( 
            <Modal>
                <div className='modal-content-wrapper'>
                    <form onSubmit={(e) => handleEditSubmit(e, editTodo.index)}>
                        <input 
                            defaultValue={editTodo.todo.todo} 
                            type="text" 
                            autoFocus={showModal} 
                            onChange={e => handleOnChangeEditTodo(e, editTodo.index)}
                            required
                        />
                        <div className='edit-button-wrapper'>
                            <button type='submit' className='submit-edit-button'><AiOutlineCheck/></button>
                            <button type='button' className='cancel-edit-button' onClick={()=> setShowModal(false)}><ImCancelCircle/></button>
                        </div>
                    </form>
                </div>
            </Modal>
            )}
            
        </div>
    );
}

export default Todo;