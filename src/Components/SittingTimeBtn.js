import React from 'react';

import './Css/SittingTimeBtn.css'

export function SittingTimeBtn (props) {  

    var Time = props.Time
    return(
        <div className='SittingTimeBtn' >{Time}</div>    
    );
}