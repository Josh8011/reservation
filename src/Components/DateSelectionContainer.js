import React, { useState } from 'react';

import './Css/DateSelectionContainer.css'
export function DateSelectionContainer(props){

    const [message, setMessage] = useState("Please Select a Month")
    let SelectedMonthDates =  props.SelectedMonthDates
    let SelectedMonth = props.SelectedMonth

    if(SelectedMonth && !SelectedMonth){
        setMessage("Please Select");
    }else if(SelectedMonthDates && SelectedMonth){
        setMessage("Please Select a Date");
    }


    return(
        <div className="DateSelectionContainer">
            <div className="DateSelectionMessage">{message}</div>
            <div>{SelectedMonth}</div>
            <div>{SelectedMonthDates}</div>
        </div>
    );
}