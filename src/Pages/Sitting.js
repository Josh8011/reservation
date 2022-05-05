import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { SittingTypeBtn, SittingTimeBtn } from '../Components';
import { fetchApi } from '../Services';
import './Css/Sittings.css'

export function Sitting(props) {
    //add seleected date here and put it in the call below

    var selectedDate = []
    var ResInfo = props.ResFunctions.reservationInfo
    var UpdateSitting = props.ResFunctions.UpdateReservationInfo
    var SelectPage = props.ResFunctions.SelectPage
    const navigate = useNavigate();
    const[sittingTimeBtns, setSittingTimeBtns] = useState("Please Select a Sitting");
    const [selectedSitting, setSelectedSitting] = useState();
    const[info, setInfo] =  useState();
    
    useEffect(()=> {

        fetchApi.sittings.getDayTypes(new Date(2022,3,9))
          .then(data => {
              setInfo(data)
            });


    },[])

    useEffect(()=>{
            if(ResInfo.sitting){
                let index = null
                for(let sit in info)
                {
                    if(info[sit].id == ResInfo.sitting.Id)
                    {
                    index = sit;
                    }
                }

                if(index)
                {
                    setSelectedSitting({index: index, id: ResInfo.sitting.Id})
                }
            }
    },[info])

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


    useEffect(()=>{
        if(selectedSitting){
            let btns = [];
            let index = selectedSitting.index;
            let start = info[index].start
            let cutOff = 10;
            let duration = info[index].duration - cutOff
            let interval = 15;
            let time = new Date();
            time.setHours(start.slice(0,2),start.slice(3,5))

            if(cutOff< interval)
            {
                duration = duration - interval 
            }

            for(let i = 0; i <= duration; i+=interval)
            {
                time.setMinutes(time.getMinutes() + interval)
                let timeOutput = `${time.getHours()}:${time.getMinutes().toString().length == 1? `${time.getMinutes()}${+0}`: time.getMinutes()}`
                btns.push(<SittingTimeBtn key={i}
                    Time={timeOutput}
                    SubmitTime={() => SubmitTime( info[index].id, timeOutput , info[index].type )}
                     />)
            }
            setSittingTimeBtns(btns);
        }
    },[selectedSitting])
    

    function SubmitTime(id, start , type ){
        SelectPage("details")
        UpdateSitting('sitting', {Start: start, Id: id, Type: type})
        navigate('/Details')

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