import React, { useState } from 'react';
import './Css/SittingTypeBtn.css'

export  function SittingTypeBtn (props){
    
    let type = props.Type 
    let SetSelectedSitting = props.SetSelectedSitting
    let isSelected = props.isSelected

    return (
        <div className={isSelected?'SittingTypeBtnSelected':'SittingTypeBtn'} onClick={SetSelectedSitting}> {type}</div>
    );
}