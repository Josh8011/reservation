import React, { useState } from 'react';
import {Link} from 'react-router-dom'
import './Css/HeaderLink.css';


export function HeaderLink(props) {

    let Name = props.Name
    let selected = props.selected
    let Path = props.Path


    return(
        <div>
            {selected? 
            <Link onClick={() => props.SelectedFunction(Name)} className='SelectedLink' to={{pathname:`/${Path}`}} >{Name}</Link>:
            <Link onClick={() => props.SelectedFunction(Name)} className='Link' to={{pathname:`/${Path}`}}>{Name}</Link>}
        </div>
    );
}