import React, { useState, useEffect } from 'react';
import { MonthSelectBtn , DateSelectionContainer} from '../Components';
import "./Css/DatePage.css"
import { fetchApi } from '../Services/Api'



export function DatePage(props){
    //How many months ahead to display
    const totalMonthsIncluded = 12;
                            //remove the date later
    const currentDate = new Date(2022,4,1);
    const endDate = new Date(currentDate).setMonth(currentDate.getMonth()+totalMonthsIncluded)
    
    const [availableDates, setAvailableDates] = useState({});

    useEffect(()=>{
        (async()=>{
            //
            await fetchApi.sittings.getDistinctAvailable(currentDate, endDate)
              .then(data => {
                setAvailableDates(...[data]);
                console.log(data);
              });
            debugger
        })();
      } ,[]);




    //Create Month buttons array 
    var monthBtns = CreateMonthBtns(totalMonthsIncluded,currentDate, ChangeSelectedMonth);
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