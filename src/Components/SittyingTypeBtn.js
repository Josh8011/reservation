import React, { useState } from 'react';
import './Css/SittingTypeBtn.css'
import peopleIcon from './Images/peopleSitting.png'

export  function SittingTypeBtn (props){
    
    let type = props.Type ;
    let SetSelectedSitting = props.SetSelectedSitting;
    let isSelected = props.isSelected;
    let totalGuests = props.TotalGuests;
    let capacity = props.Capacity;
    let people = props.ResPeople
    let message;
    let iconClass;

    if(isSelected){totalGuests+=people;}

    if (totalGuests<capacity){
        iconClass='greenIcon'
    }
    else if(totalGuests<=capacity*1.2){
        iconClass='orangeIcon'
    }
    else{
        iconClass='redIcon'
    }

    if(totalGuests > capacity){
        message = `Capacity exceeded by ${totalGuests-capacity} guests`
    }

    return (
        <div className="SittingTypeContianer">
            <div className={isSelected?'SittingTypeBtnSelected':'SittingTypeBtn'} onClick={SetSelectedSitting}>
                {type}
            </div>
            <div className='capacity'>
                <img className={iconClass} src={peopleIcon}/>
                {`${totalGuests}/${capacity}`}
                {totalGuests>capacity?
                <span class="tooltiptext">{message}</span>:
                <div/>
                }
            </div>
        </div>
    );
}