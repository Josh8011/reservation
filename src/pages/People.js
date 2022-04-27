import React from 'react';
import {PeopleSelectionLink} from '../Components';
import './Css/People.css'



export function People(props){

    var ResInfo = props.ResInfo
    var ChangePeople = props.ResFunctions.ChangePeople


    var peopleLinks = []

    for(let i =1; i < 13; i++)
    {
        peopleLinks.push(<PeopleSelectionLink key={i} ChangePeople={ChangePeople}  Qty={i}/>)
    }

    return(
        <div className='PeopleBody'>
            People
            <div className='PeopleSelectionContainer'>
            {peopleLinks}
            </div>
        </div>
    );
}