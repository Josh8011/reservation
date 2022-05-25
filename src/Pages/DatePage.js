import React, { useState, useEffect } from 'react';
import { DateSelectionBtn, MonthSelectBtn , DateYearContainer , DateCalendar} from '../Components';
import { useNavigate, useLocation} from 'react-router-dom';
import "./Css/DatePage.css"
import { fetchApi } from '../Services/Api'
import { hasSelectionSupport } from '@testing-library/user-event/dist/utils';



export function DatePage(props){

    const navigate = useNavigate();
    const location = useLocation();
    const setSelected = props.ResFunctions.setSelected
    const UpdateDate = props.ResFunctions.UpdateReservationInfo
    const resInfo = props.ResFunctions.reservationInfo


    //How many months ahead to display
    const totalMonthsIncluded = 12;
    //remove the date later
    const currentDate = new Date(2022,1,1);
    const endDate = new Date(currentDate).setMonth(currentDate.getMonth()+totalMonthsIncluded);
    
    const [availableDates, setAvailableDates] = useState();
    const [dateSelectionBtns, setDateSelectionBtns ] = useState();
    const [selectedMonth, setSelectedMonth] = useState(); 
    const [calendar, setCalendar] = useState();
    const [selectedDay, setSelectedDay] = useState();
    var DateYearContainers = [];
    let MonthSelectBtns = [];

    useEffect(()=>{
      (async()=>{
          await fetchApi.sittings.getDistinctAvailable(currentDate, endDate)
            .then (data => {
               setAvailableDates(...[data]);
            })
      })();
    setSelected(location.pathname.replace(/\//g,''));
    setSelectedMonth(resInfo.date?{Month: resInfo.date.month-1, Year: resInfo.date.year}:{Month: null, Year: null});
    setSelectedDay(resInfo.date?resInfo.date.day:null);
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
              isSelected = {year==selectedMonth.Year&&month-1==selectedMonth.Month?true:false}
              //Create an is selected prop with session storage to check if date is selected and change classname of btn component?
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
          if(availableDates&&selectedMonth.Month&&selectedMonth.Year)
          {
            let currentYearDates = availableDates[selectedMonth.Year];
            let currentMonth = selectedMonth.Month + 1;
            setDateSelectionBtns(currentYearDates[currentMonth].map( d => 
                <DateSelectionBtn
                key={d}
                date={d}
                SubmitDate={() =>SubmitDate(selectedMonth.Year, currentMonth, d)}
                isSelected = {d==selectedDay?true:false}
                />
              ));
          }

        },[selectedMonth,availableDates])
        
        function SubmitDate(Year, Month, Day){
          let reservationDate = {year: Year, month: Month, day: Day}
          UpdateDate("date", reservationDate)
          navigate("/sitting")
        }
      
        useEffect(() => { 
          setCalendar(<DateCalendar
            SelectedMonth={selectedMonth}
            DateSelectionBtns={dateSelectionBtns}

          />)

        },[dateSelectionBtns])




      return(
          <div className='container d-flex'>
            <div className='col-12 col-sm-4 pt-2'>
              {DateYearContainers}
            </div>

            <div className='col-12 col-sm-8 pt-2'>
              {selectedMonth?calendar:"Please select a month"}
            </div>

          </div>
    );
  }
  
  