import React from 'react';

import './Css/SittingTimeBtn.css'

export function SittingTimeBtn (props) {  

    let Time = props.Time;
    let SubmitTime = props.SubmitTime;
    let isSelected = props.isSelected;
    let isPast = props.isPast;

    return(
        <div className={isSelected?'SittingTimeBtnSelected':isPast?'SittingPastBtn':'SittingTimeBtn'}  onClick={SubmitTime}>
            {Time}
            {isPast?
                <span class="tooltippast">This time is in the past.</span>:
                <div/>
            }
        </div>    
    );
}