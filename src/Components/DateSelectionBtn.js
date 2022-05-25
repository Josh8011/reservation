import React from 'react';
import './Css/DateSelectionBtn.css'


export function DateSelectionBtn(props){
 
    let date = props.date
    let Submit = props.SubmitDate
    let selectedMonth = props.selectedMonth
    let isSelected = props.isSelected


    return(
        <div className={isSelected?"DateSelectedBtn":"DateSelectionBtn"} onClick={Submit} >
            {date}
        </div>
    );
}