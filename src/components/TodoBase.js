import React from 'react';
import './componentStyle.css';


const TodoBase = ({children}) => {
    return(
        <div className="todo-base">
            {children}
        </div>
    );
}

export default TodoBase;