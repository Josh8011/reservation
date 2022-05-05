import React, { useState, useEffect } from 'react';
import { MonthSelectBtn , DateSelectionContainer} from '../Components';
import "./Css/DatePage.css"


export function DatePage(props){

    var Sittings = props.Sittings
    var ChangeDate = props.ResFunctions.ChangeDate;
    var SelectPage = props.SelectPage
    var currentDate = new Date();

    //Create Month buttons array 
    var monthBtns = CreateMonthBtns(3,currentDate, ChangeSelectedMonth);
    currentDate = new Date();
    // do we want this to defaul to the current month or do we want it to be selected.
    const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth()); 
    const [selectedMonthDates, setSelectedMonthDates] = useState([]);


    
    




    function ChangeSelectedMonth(MonthToBeSelected)
    {
        setSelectedMonth(MonthToBeSelected);
    }

    return(
        <div className="DatePageContainer">
      
        </div>
    );
}


function CreateMonthBtns(NumberOfBtns, currentDate, setSelectedMonth){
    var MonthBtns = [];
    for(let i = 0; i < NumberOfBtns; i++)
    {
        MonthBtns.push( 
            <MonthSelectBtn key={i}
             SelectedMonthNumber={currentDate.getMonth() }
             Month={currentDate.toLocaleString('default', { month: 'long' })}
             SetSelectedMonth={setSelectedMonth}
             />)

        currentDate.setMonth(currentDate.getMonth()+1)
    }
    return(MonthBtns)
}