import React from 'react';


export function  DateYearContainer(props){

    var Year = props.Year;
    var MonthSelectBtns = props.MonthSelectBtns

    return(
        <div className='DateDayContainer'> 
            <div className='YearTitle' >{Year}</div>
            <div className='MonthBtnContainer'>
                {MonthSelectBtns}    
            </div>
        </div>
    );
}