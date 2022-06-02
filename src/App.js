import React, { useEffect, useState } from 'react';
import './App.css';
import Storage from './Services/storage';
import {Router} from './Navigation'
import {Header} from './Components'
import { useNavigate, useLocation} from 'react-router-dom';

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  // array of pages/data to used for creating reservationInfo & selected objects
  const reservationArray = ["people", "date", "sitting", "details"];
  //information state storage and functions
  const [reservationInfo , setReservationInfo]= useState({})
  //page selection state
  const [selected , setSelected] = useState("people");

  useEffect(()=>{
    (async()=>{
        await loadReservationInfo();
    })();
    let onReloadPage = location.pathname.replace(/\//g,'')
    setSelected(onReloadPage?onReloadPage:"people");
    //Clear sessions storage as hack fix
    sessionStorage.clear()
    navigate("/people");
  } ,[]);

  function loadReservationInfo(){
      //Get reservation info from session storage or create new
      let tempResInfo = Storage.getSessionItem('reservationInfo', reservationArray.reduce((obj, key) => ({ ...obj, [key]: null}), {}));
      //tempResInfo.date = tempResInfo.date? new Date(tempResInfo.date) : null
      //Storage.setSessionItem('reservationInfo', tempResInfo);
      setReservationInfo(tempResInfo);
  }

  function UpdateReservationInfo(propertyAsString, newValue){
  //checks if object contains passsed property
    
    if(reservationInfo.hasOwnProperty(propertyAsString)){
      let newInfo = {...reservationInfo, [propertyAsString.toLowerCase()]:newValue};
      
      if(propertyAsString.toLowerCase()===reservationArray[1]){
        newInfo[reservationArray[2]] = null;
      }
      setReservationInfo(newInfo);
      Storage.setSessionItem('reservationInfo', newInfo);
      
    }
    else{
      console.log(`reservationInfo object does not contain the property '${propertyAsString}'`)
    }
  }


  const ReservationFunctions = {reservationInfo, UpdateReservationInfo, setSelected, loadReservationInfo}

  return (
    
    <div className="App">
      {selected!=="Confirmation"? <Header ResFunctions={ReservationFunctions} Selected={selected}/> :""}
      <Router ResFunctions={ReservationFunctions}/>
    </div>
  );
}

export default App;
