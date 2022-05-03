import React, { useState } from 'react';
import { MonthSelectBtn , DateSelectionContainer} from '../Components';
import "./Css/DatePage.css"


export function DatePage(props){

    var Sittings = props.Sittings
    var ChangeDate = props.ResFunctions.ChangeDate;
    var currentDate = new Date();

    //Create Month buttons array 
    var monthBtns = CreateMonthBtns(6,currentDate, ChangeSelectedMonth);
    currentDate = new Date();
    // do we want this to defaul to the current month or do we want it to be selected.
    const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth()+1); 
    const [selectedMonthDates, setSelectedMonthDates] = useState("No Seleted Date Info");
    //if Data
    //Manage Data 
    if(Sittings[0]){
        var sittingsByMonth = SortSittingsByMonth(Sittings);
        var distinctMonths = [...new Set(Sittings.map(x => x.month))];
        var distinctDayByMonth = []

        for(let i =0; i < distinctMonths.length; i++){
            distinctDayByMonth.push([...new Set(sittingsByMonth[i].map(x => x.day))])
        }
        // console.log(Sittings)
        // console.log(sittingsByMonth)
        // console.log(distinctDayByMonth)
    }
    
    function ChangeSelectedMonth(MonthToBeSelected)
    {
        setSelectedMonth(MonthToBeSelected);
    }
    
    return(
        <div className="DatePageContainer">
            <div>
            {monthBtns}
            </div>
            <div>
            {<DateSelectionContainer SelectedMonth={selectedMonth} SelectedMonthDates={selectedMonthDates} />}
            </div>
        </div>
    );
}


function CreateMonthBtns(NumberOfBtns, currentDate, setSelectedMonth){
    var MonthBtns = [];
    for(let i = 0; i < NumberOfBtns; i++)
    {
        MonthBtns.push( 
            <MonthSelectBtn key={i}
             SelectedMonthNumber={currentDate.getMonth() + 1}
             Month={currentDate.toLocaleString('default', { month: 'long' })}
             SetSelectedMonth={setSelectedMonth}
             />)

        currentDate.setMonth(currentDate.getMonth()+1)
    }
    return(MonthBtns)
}

function SortSittingsByMonth(Sittings){
    var AllSittingsByMonth = []
    var MonthSittings = []
    var CurrentMonth = Sittings[0].month;
 
    for(let i = 0; i < Sittings.length; i++){
        
        if(Sittings[i].month == CurrentMonth)
        {
            MonthSittings.push(Sittings[i])
        }
        if(Sittings[i].month != CurrentMonth){
            CurrentMonth = Sittings[i].month
            AllSittingsByMonth.push(MonthSittings)
            MonthSittings = []
        }
        if(i == Sittings.length-1)
        {
            AllSittingsByMonth.push(MonthSittings)
        }           
    }

    return AllSittingsByMonth;
}