import React from 'react';

import './Css/SittingTimeBtn.css'

export function SittingTimeBtn (props) {  

    var Time = props.Time
    var SubmitTime = props.SubmitTime
    return(
        <div className='SittingTimeBtn'  onClick={SubmitTime}>{Time}</div>    
    );
}