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
        console.log(distinctMonths)
        console.log(sittingsByMonth)

        console.log(distinctDayByMonth)
    }
    
    useEffect(()=>{
        debugger;
        if(Sittings[0]){
            let isDays = false;
            for(let i=0; i< distinctMonths.length; i++)
            {
                if(selectedMonth == distinctMonths[i])
                {
                    setSelectedMonthDates(distinctDayByMonth[i])
                    isDays = true;
                }
            }
            if(!isDays)
            {
                setSelectedMonthDates(null)
            }
        }
    },[selectedMonth])




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
            {<DateSelectionContainer SelectedMonth={selectedMonth} SelectedMonthDates={selectedMonthDates} ChangeDate={ChangeDate} SelectPage={SelectPage}/>}
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
             SelectedMonthNumber={currentDate.getMonth() }
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