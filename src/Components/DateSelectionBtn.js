import React from 'react';
import './Css/DateSelectionBtn.css'
import { useNavigate } from 'react-router-dom';

export function DateSelectionBtn(props){
    var SelectedMonth = props.SelectedMonth
    var number = props.number;
    var ChangeDate = props.ChangeDate
    var SelectPage = props.SelectPage
    let navigate = useNavigate();

    function DateSelectionOnClick(){
        ChangeDate(`${number}/${SelectedMonth}`);
        SelectPage("Sitting");
        navigate('/sitting')
    }

    return(
        <div className="DateSelectionBtn" onClick={DateSelectionOnClick} to={"/Sitting"} >{number}</div>
    );
}