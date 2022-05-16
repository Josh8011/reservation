import React, { useState } from 'react';
import { HeaderLink } from './HeaderLink';
import './Css/Header.css';


export function Header(props) {
    
    let ResInfo = props.ResFunctions.reservationInfo
    let selected = props.Selected

    function addPadding(num){
        //return num.toString().padStart(2,'0');
        return num<10 ? '0'+num : num;
    }


    return(
        <div className='Body'>
            
            <HeaderLink selected={selected} Name={ResInfo.people? ResInfo.people: "People" } Path="people" ResInfo={ResInfo}/>
            <HeaderLink selected={selected} Name={ResInfo.date?
                `${addPadding(ResInfo.date.day)}/${addPadding(ResInfo.date.month)}/${ResInfo.date.year}`: 'Date'} Path="date" ResInfo={ResInfo}/>
            <HeaderLink selected={selected} Name={ResInfo.sitting? ResInfo.sitting.Start :"Sitting"} Path="sitting" ResInfo={ResInfo}/>
            <HeaderLink selected={selected} Name="Details" Path="details" ResInfo={ResInfo}/>       

        </div>
    );
  }