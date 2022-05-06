import React, { useState } from 'react';
import {Link} from 'react-router-dom'
import './Css/HeaderLink.css';


export function HeaderLink(props) {

    let Name = props.Name;
    let Path = props.Path;
    let linkType = props.selected? "HeaderLink-Highlighted": "HeaderLink-Link";
    let SelectedFunction = props.SelectedFunction;


    return(
        <div>
            <Link onClick={SelectedFunction} className={linkType} to={{pathname:`/${Path}`}} >{Name}</Link>
        </div>
    );
}