import React, { useState , useEffect} from 'react';
import { DateSelectionBtn } from '../Components';

import './Css/DateSelectionContainer.css'
export function DateSelectionContainer(props){

    const [message, setMessage] = useState("Please Select a Month")
    let SelectedMonthDates =  props.SelectedMonthDates
    let SelectedMonth = props.SelectedMonth
  

    let DateSelectionBtns =  CreateDateSelectionBtns(SelectedMonthDates)

    useEffect(()=>{
        if(SelectedMonthDates)
        {
            setMessage()
        }else
        {
            setMessage("Please call the resturant 03215151532 to make a reservation")
        }

    },[SelectedMonthDates])


    return(
        <div className="DateSelectionContainer">
            <div className="DateSelectionMessage">{message}</div>
            {DateSelectionBtns}
        </div>
    );
}

function CreateDateSelectionBtns(SelectedMonthDates){
    let  DateSelectionBtns = []
    if(SelectedMonthDates){
        SelectedMonthDates.forEach(date => {
            DateSelectionBtns.push(<DateSelectionBtn key={date} number={date}/> )
        });        
    }

    return DateSelectionBtns
}