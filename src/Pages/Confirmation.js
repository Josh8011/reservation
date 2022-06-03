import React, { useEffect } from 'react';
import { Row, Container, Col } from 'react-bootstrap';
import { useNavigate, useLocation} from 'react-router-dom';
import "./Css/Confirmation.css"

export function Confirmation(props){
    const location = useLocation();
    const navigate = useNavigate();
    const res = location.state.newRes;
    const setSelected = props.ResFunctions.setSelected;
    var clearRes = props.ResFunctions.loadReservationInfo;
    const sitting = res.sitting;
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    let currentDate = res.date
    const date =  `${currentDate.day}/${currentDate.month}/${currentDate.year}` ;

    useEffect(() => {
        setSelected(location.pathname.replace(/\//g,''));
    }, []);

    function newReservation(){
        sessionStorage.clear()
        clearRes();
        navigate("/people");
    }

    function clearStoredData(){
        let fields = ["people", "date", "sitting", "details"];
        fields.forEach(item=>{
        })
    }
  
    return(
        <div className='confirmationContainer'>
            <div className='receipt'>
                <div className='receiptTitle'>
                    Ref #: {res.referenceNo}
                    <br/>
                </div>
                <table>
                    <tr>
                        <th>Name:</th>
                        <td>{res.firstName} {res.lastName}</td>
                    </tr>
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
                </table>
            </div>
            <div className='newResBtn'>
                <button type="button" className="btn btn-primary btn-lg" onClick={newReservation}>New Reservation</button>
            </div>
        </div>
    );
}