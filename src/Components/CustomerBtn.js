import React from 'react';
import './Css/CustomerBtn.css'

export function CustomerBtn(props){

    let id = props.id;
    let firstName = props.firstName;
    let lastName = props.lastName;
    let phoneNumber = props.phoneNumber;
    let email = props.email;

    return(
        <div className='person-container'>
            <div className='info-container'>
                <div className='title'>Name:</div><div className='info'>{` ${firstName} ${lastName}`}</div>
            </div>
            <div className='info-container'>
                <div className='title'>Email:</div><div className='info'>{` ${email}`}</div>
            </div>
            <div className='info-container'>
                <div className='title'>Phone:</div><div className='info'>{` ${phoneNumber}`}</div>
            </div>
        </div>
    );

}