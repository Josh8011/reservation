import React from 'react';
import { Row, Container, Col } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

export function Confirmation(){
    const location = useLocation();
    console.log(location.state.newRes);
  
    return(
        <Container>
            <Row>
                <Col sm={12}>
                    RESERVATION CONFIRMED!
                </Col>
            </Row>
        </Container>
    );
}