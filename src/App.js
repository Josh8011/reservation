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
          let tempResInfo = Storage.getSessionItem('reservationInfo', {people: null, date: null, sitting: null, details:null});
          Storage.setSessionItem('reservationInfo', tempResInfo);
          setReservationInfo(tempResInfo);
    })();

  } ,[]);

  function UpdateReservationInfo(propertyAsString, newValue){
    let newInfo = {...reservationInfo, [propertyAsString]:newValue};
    setReservationInfo(newInfo);
    Storage.setSessionItem('reservationInfo', newInfo);
  }

  //Link state 
  const [selected , setSelected] = useState({people: null, date: null, sitting: null, details:null});

  function SelectPage(name){
    let newSelected = {people: null, date: null, sitting: null, details:null}
    newSelected[name] = true;
    setSelected(newSelected)
}

  const ReservationFunctions = {reservationInfo, UpdateReservationInfo, SelectPage}

  return (
    
    <div className="App">
      <Header ResFunctions={ReservationFunctions} Selected={selected}/>
      <Router ResFunctions={ReservationFunctions} Sittings={sittings}/>
    </div>
  );
}

export default App;
