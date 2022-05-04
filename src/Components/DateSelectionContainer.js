import React, { useState , useEffect} from 'react';
import { DateSelectionBtn } from '.';

import './Css/DateSelectionContainer.css'
export function DateSelectionContainer(props){

    const [message, setMessage] = useState("Please Select a Month")
    var SelectedMonthDates =  props.SelectedMonthDates
    var SelectedMonth = props.SelectedMonth

    var ChangeDate = props.ChangeDate
    var SelectPage = props.SelectPage

    var DateSelectionBtns =  CreateDateSelectionBtns(SelectedMonthDates, ChangeDate, SelectPage, SelectedMonth)

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

function CreateDateSelectionBtns(SelectedMonthDates, ChangeDate , SelectPage, SelectedMonth){
    let  DateSelectionBtns = []
    if(SelectedMonthDates){
        SelectedMonthDates.forEach(date => {
            DateSelectionBtns.push(
            <DateSelectionBtn key={date} number={date} ChangeDate={ChangeDate} SelectPage={SelectPage} SelectedMonth={SelectedMonth}/> )
        });        
    }

    return DateSelectionBtns
}