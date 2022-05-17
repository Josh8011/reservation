import React from 'react';
import { Row, Container, Col } from 'react-bootstrap';

export function Contact(){
    return(
        <Container>
            <Row>
                <Col sm={12} className='mt-3'>
                        <h1>Sorry...</h1>
                        <br />
                        <span>
                            There was an issue with your reservation request.
                            <br />
                            Please contact the restaurant: 0404 123 456
                        </span>
                </Col>
            </Row>
        </Container>
    );
}