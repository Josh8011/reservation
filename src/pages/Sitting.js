import React, { useState, useEffect } from 'react';
import { SittingTypeBtn, SittingTimeBtn } from '../Components';
import { fetchApi } from '../Services';
import './Css/Sittings.css'

export function Sitting() {
    //add seleected date here and put it in the call below
    var selectedDate = []
    const[info, setInfo] =  useState();
    useEffect(()=> {
        fetchApi.sittings.getDayTypes(new Date(2022,3,9))
          .then(data => {
              setInfo(data)
            });
    },[])
    const[sittingTimeBtns, setSittingTimeBtns] = useState("Please Select a Sitting");
    const [selectedSitting, setSelectedSitting] = useState();
    useEffect(()=>{
        if(selectedSitting){
            let btns = [];
            let index = selectedSitting.index;
            let start = info[index].start
            let cutOff = 0;
            let duration = info[index].duration - cutOff
            let interval = 15;
            let time = new Date();
            time.setHours(start.slice(0,2),start.slice(3,5))


            for(let i = 0; i < duration; i+=interval)
            {
                time.setMinutes(time.getMinutes() + interval)
                btns.push(<SittingTimeBtn key={i} Time={`${time.getHours()}:${time.getMinutes() == 0? `${time.getMinutes()}${+0}`: time.getMinutes()}`} />)
            }
            setSittingTimeBtns(btns);
        }
    },[selectedSitting])
    
    
    //if sitting is selected reder sitting type btns
    if(info)
    {
        var sittingTypeBtns = []
        info.forEach((s, index) => sittingTypeBtns.push(
            <SittingTypeBtn 
            key={s.id}
            Type={s.type}
            SetSelectedSitting={() =>setSelectedSitting({ index: index, id:s.id } )}/>))
    }
 
    

    return(
        <div className='SittingBody'>
            <div className='SittingTypeContainer'>
                {sittingTypeBtns}
            </div>
            <div className='SittingTimeContainer'>
                {sittingTimeBtns}
            </div>
        </div>

    );
  }