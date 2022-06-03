import React from 'react';

import './Css/SittingTimeBtn.css'

export function SittingTimeBtn (props) {  

    var Time = props.Time
    var SubmitTime = props.SubmitTime
    let isSelected = props.isSelected


    return(
        <div className={isSelected?'SittingTimeBtnSelected':'SittingTimeBtn'}  onClick={SubmitTime}>{Time}</div>    
    );
}