import React from 'react';
import './componentStyle.css';

const Modal = ({children}) => {
    return(
        <div className='modal-parent'>
            <div className='modal-child'>
                {children}
            </div>
        </div>
    )
}

export default Modal;