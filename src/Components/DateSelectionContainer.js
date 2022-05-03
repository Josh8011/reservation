import React, { useState } from 'react';

import './Css/DateSelectionContainer.css'
export function DateSelectionContainer(props){

    const [message, setMessage] = useState("Please Select a Month")
    let SelectedMonthDates =  props.SelectedMonthDates
    let SelectedMonth = props.SelectedMonth
  
    if(SelectedMonth){

    }

    
    return(
        <div className="DateSelectionContainer">
            <div className="DateSelectionMessage">{message}</div>
            <div>{SelectedMonth}</div>
            <div>{SelectedMonthDates}</div>
        </div>
    );
}

