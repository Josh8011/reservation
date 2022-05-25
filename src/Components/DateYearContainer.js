import React from 'react';


export function  DateYearContainer(props){

    var Year = props.Year;
    var MonthSelectBtns = props.MonthSelectBtns

    return(
        <div className='container'> 
            <h4 className='col-6 pe-1' >{Year}</h4>
            <div className='col-6 pe-1'>
                {MonthSelectBtns}    
            </div>
        </div>
    );
}