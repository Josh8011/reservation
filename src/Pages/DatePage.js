import React, { useState, useEffect } from 'react';
import { DateSelectionBtn, MonthSelectBtn , DateYearContainer , DateCalendar} from '../Components';
import { useNavigate, useLocation} from 'react-router-dom';
import "./Css/DatePage.css"
import { fetchApi } from '../Services/Api'



export function DatePage(props){

    const navigate = useNavigate();
    const location = useLocation();
    const setSelected = props.ResFunctions.setSelected
    const UpdateDate = props.ResFunctions.UpdateReservationInfo


    //How many months ahead to display
    const totalMonthsIncluded = 12;
    //remove the date later
    const currentDate = new Date(2022,1,1);
    const endDate = new Date(currentDate).setMonth(currentDate.getMonth()+totalMonthsIncluded);
    
    const [availableDates, setAvailableDates] = useState();
    const [dateSelectionBtns, setDateSelectionBtns ] = useState();
    const [selectedMonth, setSelectedMonth] = useState(); 
    const [calendar, setCalendar] = useState();
    var DateYearContainers = [];
    let MonthSelectBtns = [];

    useEffect(()=>{
        (async()=>{
            await fetchApi.sittings.getDistinctAvailable(currentDate, endDate)
              .then(data => {
                setAvailableDates(...[data]);
              });
        })();
      setSelected(location.pathname.replace(/\//g,''))
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

            <div className='col-4'>
                  {DateYearContainers}
            </div>

            <div className='col-8'>
                  {calendar}
            </div>

          </div>
    );
  }
  
  