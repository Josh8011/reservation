import React from 'react';


export function  DateYearContainer(props){

    var Year = props.Year;
    var MonthSelectBtns = props.MonthSelectBtns

    return(
        <div className='container'> 
            <div className='col-7' >{Year}</div>
            <div className='col-7'>
                {MonthSelectBtns}    
            </div>
        </div>
    );
}