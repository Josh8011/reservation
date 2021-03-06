import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation} from 'react-router-dom';
import { SittingTypeBtn, SittingTimeBtn } from '../Components';
import { fetchApi } from '../Services';

import './Css/Sittings.css'

export function Sitting(props) {

    var ResInfo = props.ResFunctions.reservationInfo
    var UpdateSitting = props.ResFunctions.UpdateReservationInfo
    var setSelected = props.ResFunctions.setSelected
    const location = useLocation();
    const navigate = useNavigate();
    const[sittingTimeBtns, setSittingTimeBtns] = useState();
    const [selectedSitting, setSelectedSitting] = useState();
    const[info, setInfo] =  useState();
    const[previousSelectedSitting, setpreviousSelectedSitting] =  useState();

    useEffect(()=>{
      setSelected(location.pathname.replace(/\//g,''))
      } ,[]);

    useEffect(()=> {
    
        fetchApi.sittings.getDayTypes(ResInfo.date)
          .then(data => {
              setInfo(data)
            });

    },[ResInfo])

    useEffect(()=>{
            if(ResInfo.sitting){
                for(let sit in info)
                {
                    if(info[sit].id == ResInfo.sitting.Id)
                    {
                    setSelectedSitting({index: sit, id: ResInfo.sitting.Id});
                    }
                }
                
                setpreviousSelectedSitting(ResInfo.sitting);
            }

    },[info])

    //if sitting is selected reder sitting type btns
    if(info)
    {
        let currentDateTime = new Date();

        var sittingTypeBtns = []
        info.forEach((s, index) => {
            //Get end time of sitting
            let startTimeArr = s.start.split(":");
            let selectedDateTime = new Date(ResInfo.date.year, ResInfo.date.month-1, ResInfo.date.day, startTimeArr[0], startTimeArr[1]);
            selectedDateTime.setMinutes(selectedDateTime.getMinutes()+s.duration-s.cutoff)
            //Maybe change this to give btn a class making it unclickable and grey
            if(selectedDateTime>currentDateTime){
                sittingTypeBtns.push(
                    <SittingTypeBtn 
                    key={s.id}
                    Type={s.type}
                    SetSelectedSitting={() =>setSelectedSitting({ index: index, id:s.id } )}
                    isSelected={selectedSitting?(index==selectedSitting.index&&s.id==selectedSitting.id):false}
                    />
                )}
            }
        )
    }

    function formatTime(dateString, addMins) {
        let date = new Date(dateString)
        let hours = date.getHours() % 12 || 12;
        let mins = date.getMinutes();
        let ampm = date.getHours() < 12 ? "AM" : "PM";
        return `${hours}:${mins<=9?'0'+mins:mins} ${ampm}`;
    }

    useEffect(()=>{
        if(selectedSitting){
            let btns = [];
            let index = selectedSitting.index;
            let start = info[index].start;
            let cutOff = info[index].cutoff;
            let duration = info[index].duration;
            let interval = info[index].interval;
            let time = new Date(ResInfo.date.year,ResInfo.date.month-1,ResInfo.date.day);
            time.setHours(start.slice(0,2),start.slice(3,5))
            let currentTime = new Date();
            
            duration -= cutOff<interval?(interval):(cutOff)

            for(let i = 0; i <= duration; i+=interval)
            {
                if(time>currentTime){
                    let timeOutput = formatTime(time)
                    let timeString = time.toString();
                    btns.push(<SittingTimeBtn key={i}
                        Time={timeOutput}
                        SubmitTime={() => SubmitTime( info[index].id, timeOutput , info[index].type, timeString)}
                        isSelected={previousSelectedSitting?(time==previousSelectedSitting.StartDateTime&&info[index].id==previousSelectedSitting.Id):false}
                        />)
                }
                time.setMinutes(time.getMinutes() + interval)
            }
            setSittingTimeBtns(btns);
        }
    },[selectedSitting])
    

    function SubmitTime(id, start, type, startDateTime ){
        //SelectPage("details")
        UpdateSitting('sitting', {Start: start, Id: id, Type: type, StartDateTime: startDateTime})
        navigate('/details')

    }   

    return(
        
    <div className='container d-sm-flex'>

        <div className='col-12 col-sm-4 pt-2'>
            <div className='col-6'>
                <h4>Sittings</h4>
            </div>
            {sittingTypeBtns}
        </div>

        <div className='col-12 col-sm-8 pt-2'>
         <div className='SittingTimeContainer'>
             <div className='col-12 d-flex justify-content-center'>
                {sittingTimeBtns?<h4>Times:</h4>:<h4>Please select a sitting</h4>}
             </div>
             <div className='col-12 d-flex flex-wrap justify-content-start'>
                {sittingTimeBtns}
             </div>
          </div>
        </div>

    </div>

    );
  }