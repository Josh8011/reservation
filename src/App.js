import React, { useEffect, useState } from 'react';
import './App.css';
import Storage from './Services/storage';
import {Router} from './Navigation'
import {Header} from './Components'
import { fetchApi } from './Services'

function App() {
  
  const [sittings, setSittings] = useState([]);
  //information state storage and functions
  const [reservationInfo , setReservationInfo]= useState({})

  useEffect(()=>{
    (async()=>{
        await fetchApi.sittings.getAvailable(new Date(2022, 3, 7))
          .then(data => {
            setSittings(...[data]);
          });
          //Get reservation info from session storage or create new
          if(!Storage.getSessionItem('reservationInfo',null)){
            Storage.setSessionItem('reservationInfo', {people: null, date: null, sitting: null, details:null})
          }
    })();

  } ,[]);

  function ChangePeople(numOfPeople){
    let newInfo = {...reservationInfo ,People:numOfPeople}
    setReservationInfo(newInfo);
  }

  function ChangeDate(newDate){
    let newInfo = {...reservationInfo, Date:newDate}
    setReservationInfo(newInfo);
  }

  function ChangeSitting(selectedSitting){
    let newInfo = {...reservationInfo, Sitting:selectedSitting}
    setReservationInfo(newInfo);
  }

  function ChangeDetails(newDetails){
    let newInfo = {...reservationInfo, Details:newDetails}
    setReservationInfo(newInfo);
  }

  const ReservationFunctions = {ChangePeople,ChangeDate, ChangeDetails, ChangeSitting}

  //Link state 
  const [selected , setSelected] = useState({people: null, date: null, sitting: null, details:null});

  function SelectPage(name){
    let newSelected = {people: null, date: null, sitting: null, details:null}
    newSelected[name] = true;
    setSelected(newSelected)
}

  return (
    
    <div className="App">
      <Header ResFunctions={ReservationFunctions} ResInfo={reservationInfo} Selected={selected} SelectPage={SelectPage}/>
      <Router ResFunctions={ReservationFunctions} ResInfo={reservationInfo} SelectPage={SelectPage} Sittings={sittings}/>
    </div>
  );
}

export default App;
