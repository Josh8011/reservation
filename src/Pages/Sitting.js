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
        var sittingTypeBtns = []
        info.forEach((s, index) => sittingTypeBtns.push(
            <SittingTypeBtn 
            key={s.id}
            Type={s.type}
            SetSelectedSitting={() =>setSelectedSitting({ index: index, id:s.id } )}
            isSelected={selectedSitting?(index==selectedSitting.index&&s.id==selectedSitting.id):false}
            />))
    }


    useEffect(()=>{
        if(selectedSitting){
            let btns = [];
            let index = selectedSitting.index;
            let start = info[index].start
            let cutOff = 10;
            let duration = info[index].duration - cutOff
            let interval = 15;
            let time = new Date(ResInfo.date.year,ResInfo.date.month-1,ResInfo.date.day);
            time.setHours(start.slice(0,2),start.slice(3,5))
            
            if(cutOff< interval)
            {
                duration = duration - interval 
            }

            for(let i = 0; i <= duration; i+=interval)
            {
                let timeOutput = `${time.getHours()}:${time.getMinutes().toString().length == 1? `${time.getMinutes()}${+0}`: time.getMinutes()}`
                let timeString = time.toString();
                btns.push(<SittingTimeBtn key={i}
                    Time={timeOutput}
                    SubmitTime={() => SubmitTime( info[index].id, timeOutput , info[index].type, timeString)}
                    isSelected={previousSelectedSitting?(time==previousSelectedSitting.StartDateTime&&info[index].id==previousSelectedSitting.Id):false}
                     />)
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
        // <div className='SittingBody'>
        //     <div className='SittingTypeContainer'>
        //         {sittingTypeBtns}
        //     </div>
        //     <div className='SittingTimeContainer'>
        //         {sittingTimeBtns}
        //     </div>
        // </div>

        
    <div className='container d-flex'>

        <div className='col-4'>
            <div className='col-6'>
                Sittings
            </div>
            {sittingTypeBtns}
        </div>

        <div className='col-8'>
         <div className='SittingTimeContainer'>
             <div className='col-12 d-flex justify-content-center'>
                {sittingTimeBtns?"Times: ":"Please select a sitting"}
             </div>
             <div className='col-12 d-flex flex-wrap justify-content-start'>
                {sittingTimeBtns}
             </div>
          </div>
        </div>

    </div>

    );
  }