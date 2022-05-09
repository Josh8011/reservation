import React, { useState } from 'react';
import './Css/HeaderLink.css';
import { useNavigate } from 'react-router-dom';
//import {Link} from 'react-router-dom'


export function HeaderLink(props) {
    let navigate = useNavigate();
    let Name = props.Name;
    let Path = props.Path;

    let IsFilled = props.IsFilled;
    let linkType = props.selected==Path? "HeaderLink-Highlighted": "HeaderLink-Link";


    return(
        IsFilled?
        <div onClick={()=>navigate(`/${Path}`)} className={linkType}>{Name}</div>
        :<div className={"HeaderLink-Unavailable"}>{Name}</div>
    );
}

//<Link onClick={()=>SelectPage(Path)} className={linkType} to={{pathname:`/${Path}`}} >{Name}</Link>
//
// IsFilled?
// <div onClick={()=>navigate(`/${Path}`)} className={linkType}>{Name}</div>
// :<div className={}>{Name}</div>


// highlighted?
// <div onClick={()=>navigate(`/${Path}`)} className={"HeaderLink-Link"}>{Name}</div>
// :<div className={linkType}>{Name}</div>