import React, { useEffect, useState } from 'react';
import './App.css';
import {Router} from './Navigation'
import {Header} from './Components'
import { FetchApi } from './Services'

function App() {
  
  const [sittings, setSittings] = useState([]);
  //information state storage and functions
  const [reservationInfo , setReservationInfo]= useState({People: null, Date: null, Sitting: null, Details:null })

  useEffect(()=>{

    (async()=>{

        await FetchApi.getSittings()
          .then(data => {
            let updated = {...sittings,Sittings: data};
            setSittings(updated);
          });

    })();

  } , []  );

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
  const [selected , setSelected] = useState({ People: true, Date: false, Sitting: false, Details: false});

  function SelectPage(name){
    let newSelected = { People: false, Date: false, Sitting: false, Details: false}
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
