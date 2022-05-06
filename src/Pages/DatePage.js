import React, { useState, useEffect } from 'react';
import { DateSelectionBtn, MonthSelectBtn , DateYearContainer} from '../Components';
import { useNavigate } from 'react-router-dom';
import "./Css/DatePage.css"
import { fetchApi } from '../Services/Api'


export function DatePage(props){

    var SelectPage = props.ResFunctions.SelectPage
    var UpdateDate = props.ResFunctions.UpdateReservationInfo
    var ResInfo = props.ResFunctions.reservationInfo
    var navigate = useNavigate();


    //How many months ahead to display
    const totalMonthsIncluded = 12;
    //remove the date later
    const currentDate = new Date(2022,3,1);
    const endDate = new Date(currentDate).setMonth(currentDate.getMonth()+totalMonthsIncluded);
    
    const [availableDates, setAvailableDates] = useState();
    const [dateSelectionBtns, setDateSelectionBtns ] = useState();
    const [selectedMonth, setSelectedMonth] = useState(); 
    var DateYearContainers = [];
    let MonthSelectBtns = [];

    useEffect(()=>{
        (async()=>{
            await fetchApi.sittings.getDistinctAvailable(currentDate, endDate)
              .then(data => {
                setAvailableDates(...[data]);
              });
        })();
      } ,[]);



      if(availableDates)
      {
        for(let year in availableDates){
          for(let month in availableDates[year])
          {
            let dateObject = new Date()
            dateObject.setMonth(month - 1)
            MonthSelectBtns.push(
              <MonthSelectBtn
              key={month}
              Year={year}
              Month={dateObject.toLocaleString('default', { month: 'long'})}
              setSelectedMonth={() => setSelectedMonth({Month: dateObject.getMonth(), Year: year})}
              />);
            }
            DateYearContainers.push( <DateYearContainer
            key={year}
            Year={year}
            MonthSelectBtns={MonthSelectBtns}
            />)
            MonthSelectBtns = [];
        }
      }

      useEffect(()=> {
          if(availableDates)
          {
            let currentYearDates = availableDates[selectedMonth.Year];
            let currentMonth = selectedMonth.Month + 1;
            setDateSelectionBtns(currentYearDates[currentMonth].map( d => 
                <DateSelectionBtn
                key={d}
                date={d}
                SubmitDate={() =>SubmitDate(selectedMonth.Year, currentMonth, d)}
                />
              ));
          }

      },[selectedMonth])

      function SubmitDate(Year, Month, Date){
        
        SelectPage("sitting");
        UpdateDate("date", `${Year}/${Month}/${Date}`)
        navigate("/Sitting", { state: { Date: `${Year}/${Month}/${Date}` } })
      }

    return(
        <div className="DatePageContainer">
            <div className="DateSelectionContainer">
                {DateYearContainers}
            </div>
            <div className="DateDayContainer">
                {dateSelectionBtns}
            </div>
        </div>
    );
}

