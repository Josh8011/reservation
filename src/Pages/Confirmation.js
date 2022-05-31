import React, { useEffect } from 'react';
import { Row, Container, Col } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import "./Css/Confirmation.css"

export function Confirmation(props){
    const location = useLocation();
    const res = location.state.newRes;
    const setSelected = props.ResFunctions.setSelected;
    const sitting = res.sitting;
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    let currentDate = res.date
    const date =  `${currentDate.day}/${currentDate.month}/${currentDate.year}` ;

    useEffect(() => {
        setSelected(location.pathname.replace(/\//g,''));
    }, []);
  
    return(
        <div className='confirmationContainer'>
            <div className='receipt'>
                <div className='receiptTitle'>
                    Thank you <br/>
                    {res.firstName} {res.lastName}
                </div>
                <table>
                    <tr>
                        <th>Date:</th>
                        <td>{date}</td>
                    </tr>
                    <tr>
                        <th>Sitting:</th>
                        <td>{sitting.Start} {sitting.Type}</td>
                    </tr>
                    <tr>
                        <th>Email:</th>
                        <td>{res.email}</td>
                    </tr>
                    <tr>
                        <th>Phone:</th>
                        <td>{res.phoneNumber}</td>
                    </tr>
                    <tr>
                        <th>Guests:</th>
                        <td>{res.noOfGuests}</td>
                    </tr>
                    <tr>
                        <th>Notes:</th>
                        <td>{res.customerNotes}</td>
                    </tr>
                    <tr>
                        <th>Reference#:</th>
                        <td>{res.referenceNo}</td>
                    </tr>
                </table>
                {/* <div className='receiptBody'>
                    <div className='receiptDataTitle'>
                        <p>Date:</p>
                        <p>Sitting:</p>
                        <p>Email:</p>
                        <p>Phone:</p>
                        <p>Guests:</p>
                        <p>Notes:</p>
                        <br/>
                        <p>Reference#:</p>
                        <p>Status:</p>
                    </div>
                    <div className='receiptData'>
                        <p>{date}</p>
                        <p>{sitting.Start} {sitting.Type}</p>
                        <p>{res.email}</p>
                        <p>{res.phoneNumber}</p>
                        <p>{res.noOfGuests}</p>
                        <p>{res.customerNotes}</p>
                        <br/>
                        <p>{res.referenceNo}</p>
                        
                        Pending
                    </div>
                </div> */}
            </div>
        </div>
    );
}