import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Form, Container, Col, FloatingLabel, Button } from 'react-bootstrap';
import { fetchApi } from '../Services/Api';

export function Details(props){

    const navigate = useNavigate();
    //HACK: hardcoded data, should be refactored to take argument & pass that to api
    const onSubmit = (event) => {
        //var temp = e.target.value;
        event.preventDefault();
        event.stopPropagation();
        var reservationDto = {
            CustomerNotes: "",
            NoOfGuests : 3,
            SittingId: 1,
            ReservationOriginId: 1,
            ReservationStatusId: 1,
            FirstName: "John",
            LastName: "Smith",
            Email: "JohnSmith@gmail.com",
            PhoneNumber: "0412456789",
            RestaurantId: 1
        };
        
        var newReservation = fetchApi.reservations.create(reservationDto);

        newReservation.then(data => {
            debugger; 
            navigate("/Confirmation", { state: { newRes: data } });
        })              
    };

    return(
        <Container>
            <Row>
                <Col sm={12}>
                    <Form onSubmit={onSubmit}>
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