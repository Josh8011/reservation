import React from 'react';
import {Link} from 'react-router-dom'
import './Css/PeopleSelectionLink.css'

export function  PeopleSelectionLink(props) {  

    let Qty = props.Qty
    var ChangePeople = props.ChangePeople
    var SelectPage = props.SelectPage

    function onClickLink()
    {
        ChangePeople(Qty);
        SelectPage("Date");
    }

    return(
        <Link className='PeopleSelectionLink' onClick={onClickLink}  to={"/DatePage"}>{Qty}</Link>
    );
}