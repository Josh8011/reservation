import React, { useState } from 'react';
import { HeaderLink } from './HeaderLink';
import './Css/Header.css';


export function Header(props) {
    
    let ResInfo = props.ResFunctions.reservationInfo
    let selected = props.Selected
    let SelectPage = props.ResFunctions.SelectPage

    function addPadding(num){
        return num.toString().padStart(2,'0');
    }


    return(
        <div className='Body'>
            
            <HeaderLink selected={selected.People} SelectedFunction={SelectPage} Name={ResInfo.people? ResInfo.people: "People" } Path="People"/>
            <HeaderLink selected={selected.DatePage} SelectedFunction={SelectPage} Name={ResInfo.date?
                `${addPadding(ResInfo.date.getDate())}/${addPadding(ResInfo.date.getMonth()+1)}/${ResInfo.date.getFullYear()}`: 'Date'} Path="DatePage"/>
            <HeaderLink selected={selected.Sitting} SelectedFunction={SelectPage} Name={ResInfo.sitting? ResInfo.sitting.Start :"Sitting"} Path="Sitting"/>
            <HeaderLink selected={selected.Details} SelectedFunction={SelectPage} Name="Details" Path="Details"/>       

        </div>
    );
  }