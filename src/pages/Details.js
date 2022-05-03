import React from 'react';
import { Row, Form, Container, Col, FloatingLabel, Button } from 'react-bootstrap';

export function Details(props){
    return(
        <Container>
            <Row>
                <Col sm={12}>
                    <Form action="https://localhost:7271/api/reservations">
                        <FloatingLabel
                            controlId="floatingInput"
                            label="First Name"
                            className="my-3">
                            <Form.Control type="text" placeholder="John" />
                        </FloatingLabel>

                        <FloatingLabel
                            controlId="floatingInput"
                            label="Last Name"
                            className="mb-3">
                            <Form.Control type="text" placeholder="Smith" />
                        </FloatingLabel>

                        <FloatingLabel
                            controlId="floatingInput"
                            label="Phone Number"
                            className="mb-3">
                            <Form.Control type="text" placeholder="04123456" />
                        </FloatingLabel>

                        <FloatingLabel
                            controlId="floatingInput"
                            label="Email Address"
                            className="mb-3">
                            <Form.Control type="email" placeholder="name@example.com" />
                        </FloatingLabel>

                        <FloatingLabel
                            controlId="floatingInput"
                            label="Notes"
                            className="mb-3">
                            <Form.Control 
                                as="textarea"
                                style={{ height: '100px' }}
                                placeholder="E.g., One high chair please." 
                            />
                        </FloatingLabel>

                        <Row>
                            <Col>
                                <Button variant="success" type="submit" size="lg">
                                    Submit
                                </Button>
                            </Col>
                            <Col>
                                <Button variant="danger" size="lg">
                                    Cancel
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}