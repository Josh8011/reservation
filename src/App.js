import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import {Router} from './Navigation'
import {Header} from './Components'
import { FetchApi } from './Services'

function App() {

  const [sittings, setSittings] = useState([]);
  const [reservationInfo , setReservationInfo]= useState({People: null, Date: null, Sitting: null, Details:null })

  useEffect(()=>{

    (async()=>{

        await FetchApi.getSittings()
          .then(data => {
            debugger;
            let updated = {...reservationInfo, data};
            setSittings(updated);
          });

    })();

  } , []  );

  function ChangePeople(numOfPeople){
    let newInfo = reservationInfo
    newInfo["People"] = numOfPeople;
    setReservationInfo(newInfo);
  }

  function ChangeDate(newDate){
    let newInfo = reservationInfo
    newInfo["Date"] = newDate;
    setReservationInfo(newInfo);
  }

  function ChangeSitting(selectedSitting){
    let newInfo = reservationInfo
    newInfo["Sitting"] = selectedSitting;
    setReservationInfo(newInfo);
  }

  function ChangeDetails(newDetails){
    let newInfo = reservationInfo
    newInfo["Details"] = newDetails;
    setReservationInfo(newInfo);
  }

  const ReservationFunctions = {ChangePeople,ChangeDate, ChangeDetails, ChangeSitting}

  return (
    <div className="App">
      <Header ResFunctions={ReservationFunctions} ResInfo={reservationInfo}/>
      <Router ResFunctions={ReservationFunctions} ResInfo={reservationInfo}/>
    </div>
  );
}

export default App;
