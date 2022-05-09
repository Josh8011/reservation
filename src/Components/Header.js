import React, { useState } from 'react';
import { HeaderLink } from './HeaderLink';
import './Css/Header.css';


export function Header(props) {
    
    let ResInfo = props.ResFunctions.reservationInfo
    let selected = props.Selected

    function addPadding(num){
        return num.toString().padStart(2,'0');
    }


    return(
        <div className='Body'>
            
            <HeaderLink selected={selected} Name={ResInfo.people? ResInfo.people: "People" } Path="people" IsFilled={ResInfo.people}/>
            <HeaderLink selected={selected} Name={ResInfo.date?
                `${addPadding(ResInfo.date.getDate())}/${addPadding(ResInfo.date.getMonth()+1)}/${ResInfo.date.getFullYear()}`: 'Date'} Path="date" IsFilled={ResInfo.date}/>
            <HeaderLink selected={selected} Name={ResInfo.sitting? ResInfo.sitting.Start :"Sitting"} Path="sitting" IsFilled={ResInfo.sitting}/>
            <HeaderLink selected={selected} Name="Details" Path="details" IsFilled={ResInfo.details}/>       

        </div>
    );
  }