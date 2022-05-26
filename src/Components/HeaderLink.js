import React, { useState } from 'react';
import './Css/HeaderLink.css';
import { useNavigate } from 'react-router-dom';
//import {Link} from 'react-router-dom'


export function HeaderLink(props) {
    let navigate = useNavigate();
    let Name = props.Name;
    let Path = props.Path;
    let ResInfo = props.ResInfo;
    let imageLink = props.imageLink;
    let selected = props.selected;

    let linkType = props.selected==Path? "HeaderLink-Highlighted": "HeaderLink-Link";

    let keysArray = Object.keys(ResInfo);
    let valueOfFirstNull = Object.values(ResInfo).indexOf(null);
    let firstNull = valueOfFirstNull<0?keysArray.length:valueOfFirstNull
    let poisitionOfKey = keysArray.indexOf(Path);
    let isClickable = firstNull>=poisitionOfKey;



    return(
        isClickable?
        <div onClick={()=>navigate(`/${Path}`)} className={linkType}>
            {Name}
            <img className={selected==Path?'iconSelected':'icon'} src={imageLink}/>
        </div>
        :
        <div className={"HeaderLink-Unavailable"}>
            {Name}
            <img className='iconUnavailable' src={imageLink}/>
        </div>
    );
}

// let IsFilled = props.IsFilled;
// let linkType = props.selected==Path? "HeaderLink-Highlighted": "HeaderLink-Link";


// return(
//     IsFilled?
//     <div onClick={()=>navigate(`/${Path}`)} className={linkType}>{Name}</div>
//     :<div className={"HeaderLink-Unavailable"}>{Name}</div>
// );