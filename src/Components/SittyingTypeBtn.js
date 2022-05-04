import React, { useState } from 'react';
import './Css/SittingTypeBtn.css'

export  function SittingTypeBtn (props){
    
    var type = props.Type 
    var SetSelectedSitting = props.SetSelectedSitting

    return (
        <div className='SittingTypeBtn' onClick={SetSelectedSitting}> {type}</div>
    );
}