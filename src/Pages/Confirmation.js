import React, { useEffect } from 'react';
import { Row, Container, Col } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

export function Confirmation(){
    const location = useLocation();
    const res = location.state.newRes;
    const sitting = res.sitting;
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const date = res.date.toLocaleDateString("en-US", options);

    useEffect(() => {

    }, []);
  
    return(
        <Container>
            <Row>
                <Col sm={12} className='mt-3'>
                        <h1>Thank you {res.firstName} {res.lastName}</h1>
                        <br />
                        DateTime: {date} <br />
                        Sitting: {sitting.Start} {sitting.Type}<br />
                        Email: {res.email} <br />
                        Phone Number: {res.phoneNumber} <br />
                        Number of Guests: {res.noOfGuests} <br />
                        Notes: <br />
                        {res.customerNotes}

                        <br /> <br />
                        Reference Number: {res.referenceNo} <br />
                        Status: Pending (HARDCODED) <br />
                </Col>
            </Row>
        </Container>
    );
}