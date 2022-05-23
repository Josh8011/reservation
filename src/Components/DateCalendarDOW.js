import React from 'react';

import './Css/DateCalendarDOW.css'



export function DateCalendarDOW (props){

    var Day = props.Day 

    return(
    <div className='DateCalendarDOW'>
        {Day}
    </div>
    );

}