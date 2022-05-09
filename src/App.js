import React, { useEffect, useState } from 'react';
import './App.css';
import Storage from './Services/storage';
import {Router} from './Navigation'
import {Header} from './Components'
import {useLocation} from 'react-router-dom'

function App() {
  //information state storage and functions
  const [reservationInfo , setReservationInfo]= useState({})
  //Link state 
  const [selected , setSelected] = useState({People: false, DatePage: false, Sitting: false, Details: false});
  const location = useLocation();

  useEffect(()=>{
    (async()=>{
        await loadReservationInfo();
    })();
    debugger;
    SelectPage(location.pathname.replace(/\//g,''));
  } ,[]);

  function loadReservationInfo(){
      //Get reservation info from session storage or create new
      let tempResInfo = Storage.getSessionItem('reservationInfo', {people: null, date: null, sitting: null, details: null});
      tempResInfo.date = tempResInfo.date? new Date(tempResInfo.date) : null
      Storage.setSessionItem('reservationInfo', tempResInfo);
      setReservationInfo(tempResInfo);
  }

  function UpdateReservationInfo(propertyAsString, newValue){
  //checks if object contains passsed property
    if(reservationInfo.hasOwnProperty(propertyAsString)){
      let newInfo = {...reservationInfo, [propertyAsString.toLowerCase()]:newValue};
      setReservationInfo(newInfo);
      Storage.setSessionItem('reservationInfo', newInfo);
    }
    else{
      console.log(`reservationInfo object does not contain the property '${propertyAsString}'`)
    }
  }


  function SelectPage(name){
    let newSelected = {People: false, DatePage: false, Sitting: false, Details: false}
    newSelected[name] = true;
    setSelected(newSelected)
}

  const ReservationFunctions = {reservationInfo, UpdateReservationInfo, SelectPage}

  return (
    
    <div className="App">
      <Header ResFunctions={ReservationFunctions} Selected={selected}/>
      <Router ResFunctions={ReservationFunctions}/>
    </div>
  );
}

export default App;
