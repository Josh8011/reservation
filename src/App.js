import React, { useEffect, useState } from 'react';
import './App.css';
import Storage from './Services/storage';
import {Router} from './Navigation'
import {Header} from './Components'
import {useLocation} from 'react-router-dom'

function App() {
  const location = useLocation();
  // array of pages/data to used for creating reservationInfo & selected objects
  const reservationArray = ["people", "date", "sitting", "details"];
  //information state storage and functions
  const [reservationInfo , setReservationInfo]= useState({})
  //page selection state
  const [selected , setSelected] = useState({});

  useEffect(()=>{
    (async()=>{
        await loadReservationInfo();
    })();
    let onReloadPage = location.pathname.replace(/\//g,'')
    setSelected(onReloadPage?onReloadPage:"people");
    //debugger;
  } ,[]);

  function loadReservationInfo(){
      //Get reservation info from session storage or create new
      let tempResInfo = Storage.getSessionItem('reservationInfo', reservationArray.reduce((obj, key) => ({ ...obj, [key]: null}), {}));
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
    //let newSelected = {People: false, DatePage: false, Sitting: false, Details: false}
    let newSelected = reservationArray.reduce((obj, key) => ({ ...obj, [`${key}Page`]: (name==key?true:false)}), {})
    setSelected(newSelected)
}

  const ReservationFunctions = {reservationInfo, UpdateReservationInfo, setSelected}

  return (
    
    <div className="App">
      <Header ResFunctions={ReservationFunctions} Selected={selected}/>
      <Router ResFunctions={ReservationFunctions}/>
    </div>
  );
}

export default App;
