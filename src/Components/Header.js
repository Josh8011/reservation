import React, { useState } from 'react';
import { HeaderLink } from './HeaderLink';
import './Css/Header.css';


export function Header(props) {
    
    var ResInfo = props.ResInfo
    var selected = props.Selected
    var SelectPage = props.SelectPage


    return(
        <div className='Body'>
            
            <HeaderLink selected={selected.People} SelectedFunction={SelectPage} Name={ResInfo.People? ResInfo.People: "People" } Path="People"/>
            <HeaderLink selected={selected.Date} SelectedFunction={SelectPage} Name="Date" Path="DatePage"/>
            <HeaderLink selected={selected.Sitting} SelectedFunction={SelectPage} Name="Sitting" Path="Sitting"/>
            <HeaderLink selected={selected.Details} SelectedFunction={SelectPage} Name="Details" Path="Details"/>       

        </div>
    );
  }