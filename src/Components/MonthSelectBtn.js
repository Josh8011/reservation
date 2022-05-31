import React from 'react';
import "./Css/MonthSelectBtn.css"

export function MonthSelectBtn(props)
{
    let Month = props.Month;
    let setSelectedMonth = props.setSelectedMonth
    let isSelected = props.isSelected
    let monthData = props.monthData;

    return(
        <div className={isSelected?"MonthSelectedBtn":"MonthSelectBtn"} onClick={setSelectedMonth}> {Month}</div>
    );
}


