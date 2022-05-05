import React, { useEffect } from 'react';
import { Row, Container, Col } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

export function Confirmation(){
    const location = useLocation();
    const res = location.state.newRes;

    useEffect(() => {
        console.log(res);
    }, []);
  
    return(
        <Container>
            <Row>
                <Col sm={12}>
                    <div className='mt-3'>
                        <h1>Thank you {res.firstName} {res.lastName}</h1>
                        <br />
                        DateTime: N/A <br />
                        Email: {res.email} <br />
                        Phone Number: {res.phoneNumber} <br />
                        Number of Guests: {res.noOfGuests} <br />
                        Notes: <br />
                        {res.customerNotes}

                        <br /> <br />
                        Reference Number: {res.referenceNo} <br />
                        Status: Pending (HARDCODED) <br />
                    </div>
                </Col>
            </Row>
        </Container>
    );
}