import React, { useState } from 'react';
import { HeaderLink } from './HeaderLink';
import './Css/Header.css';


export function Header(props) {


    const [selected , setSelected] = useState({ People: true, Date: false, Sitting: false, Details: false});

    let ResInfo = props.ResInfo

    // console.log(ResInfo.People)

    function OnLinkClick(name){
        let newSelected = { People: false, Date: false, Sitting: false, Details: false}
        newSelected[name] = true;
        setSelected(newSelected)
    }


    return(
        <div className='Body'>
            
            <HeaderLink selected={selected.People} SelectedFunction={OnLinkClick} Name={ResInfo.People? ResInfo.People: "People" } Path="People"/>
            <HeaderLink selected={selected.Date} SelectedFunction={OnLinkClick} Name="Date" Path="Date"/>
            <HeaderLink selected={selected.Sitting} SelectedFunction={OnLinkClick} Name="Sitting" Path="Sitting"/>
            <HeaderLink selected={selected.Details} SelectedFunction={OnLinkClick} Name="Details" Path="Details"/>       

        </div>
    );
  }