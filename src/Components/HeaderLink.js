import React, { useState } from 'react';
import './Css/HeaderLink.css';
import { useNavigate } from 'react-router-dom';
//import {Link} from 'react-router-dom'


export function HeaderLink(props) {
    let navigate = useNavigate();
    let Name = props.Name;
    let Path = props.Path;
    let linkType = props.selected==Path? "HeaderLink-Highlighted": "HeaderLink-Link";
    let SelectPage = props.SelectedFunction;


    return(
        <div onClick={()=>navigate(`/${Path}`)} className={linkType}>{Name}</div>
    );
}

//navigate("/Date");
//<Link onClick={()=>SelectPage(Path)} className={linkType} to={{pathname:`/${Path}`}} >{Name}</Link>

