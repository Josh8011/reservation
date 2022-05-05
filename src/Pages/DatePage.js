import React, { useState, useEffect } from 'react';
import { DateSelectionBtn, MonthSelectBtn } from '../Components';
import "./Css/DatePage.css"
import { fetchApi } from '../Services/Api'


export function DatePage(props){
    //How many months ahead to display
    const totalMonthsIncluded = 12;
    // //remove the date later
    const currentDate = new Date(2022,3,1);
    const endDate = new Date(currentDate).setMonth(currentDate.getMonth()+totalMonthsIncluded)
    
    const [availableDates, setAvailableDates] = useState();
    let MonthSelectBtns = []
    const [dateSelectionBtns, setDateSelectionBtns ] = useState();

    useEffect(()=>{
        (async()=>{
            await fetchApi.sittings.getDistinctAvailable(currentDate, endDate)
              .then(data => {
                setAvailableDates(...[data]);
              });
        })();
      } ,[]);

      const [selectedMonth, setSelectedMonth] = useState(); 

      if(availableDates)
      {
        for(let month in availableDates)
        {
            let dateObject = new Date()
            dateObject.setMonth(month - 1)

            MonthSelectBtns.push(
            <MonthSelectBtn
            key={month}
            Month={dateObject.toLocaleString('default', { month: 'long'})}
            setSelectedMonth={() => setSelectedMonth(dateObject.getMonth())}
            />)
        }
      }


      useEffect(()=> {
          if(availableDates)
          {
            setDateSelectionBtns(availableDates[selectedMonth + 1].map( d => 
                <DateSelectionBtn
                key={d}
                date={d}
                SubmitDate={() =>SubmitDate("test")}
                />
              ));
          }

      },[selectedMonth])

      
      function SubmitDate(input){
        console.log(input)
      }





    return(
        <div className="DatePageContainer">
            <div className="DateSelectionContainer">
                {MonthSelectBtns}
            </div>
            <div className="DateDayContainer">
                {dateSelectionBtns}
            </div>
        </div>
    );
}



    // //Create Month buttons array 
    // var monthBtns = CreateMonthBtns(totalMonthsIncluded,currentDate, ChangeSelectedMonth);
    // // do we want this to defaul to the current month or do we want it to be selected.
    // const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth()); 
    // const [selectedMonthDates, setSelectedMonthDates] = useState([]);

    // function ChangeSelectedMonth(MonthToBeSelected)
    // {
    //     setSelectedMonth(MonthToBeSelected);
    // }

