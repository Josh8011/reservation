import React from 'react';
import './Css/DateSelectionBtn.css'


export function DateSelectionBtn(props){
 
    let date = props.date
    let Submit = props.SubmitDate

    return(
        <div className="DateSelectionBtn" onClick={Submit} >
            {date}
        </div>
    );
}