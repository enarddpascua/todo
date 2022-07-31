import React from 'react';


const Button = ({title=""}) => {
    return(
        <div className="button-base">
            <button>
                {title}
            </button>
        </div>
    );
}

export default Button;