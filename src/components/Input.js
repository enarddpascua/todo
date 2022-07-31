import React from 'react';
import './componentStyle.css';
import {FaRegSave} from 'react-icons/fa';
import {BiReset} from 'react-icons/bi';
import {MdAdd} from 'react-icons/md';


const Input = ({handleSubmit, inputRef, clearTodos, saveTodos}) => {
    return(
        <div className="input-base">
            <form onSubmit={e => handleSubmit(e)}>
                <input type="text" placeholder='Add todo here...'ref={inputRef} required/>
                <div className='form-btn-wrapper'>
                    <button type="submit" className='add-todo-btn'><MdAdd/></button>
                    <button type='button' className='clear-btn' onClick={() => clearTodos()}><BiReset/></button>
                    <button type='button' className='save-btn' onClick={() => saveTodos()}><FaRegSave/></button>
                </div>
            </form>
        </div>
    );
}

export default Input;