import React, { useState } from 'react';
import { HeaderLink } from './HeaderLink';
import './Css/Header.css';
import peopleIcon from './Images/people.png'
import dateIcon from './Images/date.png'
import sittingIcon from './Images/sitting.png'
import detailsIcon from './Images/details.png'


export function Header(props) {
    
    let ResInfo = props.ResFunctions.reservationInfo
    let selected = props.Selected

    function addPadding(num){
        return num<10 ? '0'+num : num;
    }


    return(
        <div className='header-body'>
            
            <HeaderLink selected={selected} Name={ResInfo.people? ResInfo.people: "People" } Path="people" ResInfo={ResInfo} imageLink={peopleIcon}/>
            <HeaderLink selected={selected} Name={ResInfo.date?
                `${addPadding(ResInfo.date.day)}/${addPadding(ResInfo.date.month)}/${ResInfo.date.year}`: 'Date'} Path="date" ResInfo={ResInfo} imageLink={dateIcon}/>
            <HeaderLink selected={selected} Name={ResInfo.sitting? ResInfo.sitting.Start :"Sitting"} Path="sitting" ResInfo={ResInfo} imageLink={sittingIcon}/>
            <HeaderLink selected={selected} Name="Details" Path="details" ResInfo={ResInfo} imageLink={detailsIcon}/>       

        </div>
    );
  }