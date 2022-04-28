import React, { useState } from 'react';
import {Link} from 'react-router-dom'
import './Css/HeaderLink.css';


export function HeaderLink(props) {

    let Name = props.Name
    let selected = props.selected
    let Path = props.Path
    let linkType = "HeaderLink-Link"

    if(selected)
    {
        linkType="HeaderLink-Highlighted"
    }


    return(
        <div>
            <Link onClick={() => props.SelectedFunction(Path)} className={linkType} to={{pathname:`/${Path}`}} >{Name}</Link>
        </div>
    );
}