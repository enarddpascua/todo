import React from 'react';
import './componentStyle.css';


const NavigationBar = ({children}) => {
    return(
        <div className="navigation-base">
            {children}
        </div>
    );
}

export default NavigationBar;