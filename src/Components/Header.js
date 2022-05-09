import React, { useState } from 'react';
import { HeaderLink } from './HeaderLink';
import './Css/Header.css';


export function Header(props) {
    
    let ResInfo = props.ResFunctions.reservationInfo
    let selected = props.Selected
    let SelectPage = props.ResFunctions.setSelected

    function addPadding(num){
        return num.toString().padStart(2,'0');
    }


    return(
        <div className='Body'>
            
            <HeaderLink selected={selected} SelectPage={SelectPage} Name={ResInfo.people? ResInfo.people: "People" } Path="people"/>
            <HeaderLink selected={selected} SelectPage={SelectPage} Name={ResInfo.date?
                `${addPadding(ResInfo.date.getDate())}/${addPadding(ResInfo.date.getMonth()+1)}/${ResInfo.date.getFullYear()}`: 'Date'} Path="date"/>
            <HeaderLink selected={selected} SelectPage={SelectPage} Name={ResInfo.sitting? ResInfo.sitting.Start :"Sitting"} Path="sitting"/>
            <HeaderLink selected={selected} SelectPage={SelectPage} Name="Details" Path="details"/>       

        </div>
    );
  }