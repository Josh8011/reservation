import React from 'react';

import './Css/DateCalendarGreyButton.css'

export function DateCalendarGreyButton (props)  {


    var Number = props.Number

    return(
    <div className='DateCalendarGreyButton'>
        {Number}
    </div>
        );

}