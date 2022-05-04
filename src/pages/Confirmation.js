import React from 'react';
import { Row, Container, Col } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

export function Confirmation(){
    const location = useLocation();
    const reservation = location.state.newRes;
  
    return(
        <Container>
            <Row>
                <Col sm={12}>
                    <div className='mt-3'>
                        <h1>Confirmation</h1>
                        <br />
                        Reference Number: {reservation.referenceNo}
                    </div>
                </Col>
            </Row>
        </Container>
    );
}