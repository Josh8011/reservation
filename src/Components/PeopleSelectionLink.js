import React from 'react';
import {Link} from 'react-router-dom'
import './Css/PeopleSelectionLink.css'

export function  PeopleSelectionLink(props) {  

    let Qty = props.Qty
    var ChangePeople = props.ChangePeople

    return(
        <Link className='PeopleSelectionLink' onClick={() => ChangePeople(Qty)} to={"/Date"}>{Qty}</Link>
    );
}