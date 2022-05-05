import React, { useState } from 'react';
import { HeaderLink } from './HeaderLink';
import './Css/Header.css';


export function Header(props) {
    
    var ResInfo = props.ResFunctions.reservationInfo
    var selected = props.Selected
    var SelectPage = props.ResFunctions.SelectPage


    return(
        <div className='Body'>
            
            <HeaderLink selected={selected.People} SelectedFunction={SelectPage} Name={ResInfo.people? ResInfo.people: "People" } Path="People"/>
            <HeaderLink selected={selected.Date} SelectedFunction={SelectPage} Name="Date" Path="DatePage"/>
            <HeaderLink selected={selected.Sitting} SelectedFunction={SelectPage} Name={ResInfo.sitting? ResInfo.sitting.Start :"Sitting"} Path="Sitting"/>
            <HeaderLink selected={selected.Details} SelectedFunction={SelectPage} Name="Details" Path="Details"/>       

        </div>
    );
  }