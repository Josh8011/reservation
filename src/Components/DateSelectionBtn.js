import React from 'react';
import './Css/DateSelectionBtn.css'

export function DateSelectionBtn(props){
    let number = props.number


    function DateSelectionOnClick(){

    }

    return(
        <div className="DateSelectionBtn" onClick={DateSelectionOnClick} >{number}</div>
    );
}