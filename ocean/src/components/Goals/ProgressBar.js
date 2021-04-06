import React from "react";
import './progressbar.css'

const bgcolor = '#a59a7d'

const ProgressBar = (props) => {
    const { completed } = props;

    return (
        <div className='bar'>
            <div className='progress' style={{ width: `${completed}%`}}>
               <span className='percentLabel'>{`${completed}%`}</span>
            </div>
        </div>
    );
};

export default ProgressBar;
