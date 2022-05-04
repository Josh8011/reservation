import React, { useState, useEffect } from 'react';
import { SittingTypeBtn, SittingTimeBtn } from '../Components';
import './Css/Sittings.css'

export function Sitting() {



    var info = [
    {id:1, type:"Breakfast", Duration:240},
    {id:1, type:"Lunch", Duration:120},
    {id:1, type:"Dinner", Duration:300}
    ];



    const [selectedSitting, setSelectedSitting] = useState();
    useEffect(()=>{
        var  sittingTimeBtns = []


    },[selectedSitting])

    if(info)
    {
        var SittingTypeBtns = []
        info.forEach(s => SittingTypeBtns.push())
        console.log(sittingTimeBtns)
    }

    



    return(
        <div className='SittingBody'>
            <div className='SittingTypeContainer'>
        asdfasdf    
            </div>
            <div className='SittingTimeContainer'>
                aasdf
            </div>
        </div>

    );
  }