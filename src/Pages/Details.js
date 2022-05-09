import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Form, Container, Col, FloatingLabel, Button } from 'react-bootstrap';
import { fetchApi } from '../Services/Api';

export function Details(props){

    const updateRes = props.ResFunctions.UpdateReservationInfo;
    const resInfo = props.ResFunctions.reservationInfo;
    const selectPage = props.ResFunctions.SelectPage;
    const noOfPeople = resInfo.people;
    const date = resInfo.date;
    const sitting = resInfo.sitting;
    const navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();

        let reservationDto = {
            CustomerNotes: e.target.customerNotes.value,
            NoOfGuests : noOfPeople,
            SittingId: 1,
            ReservationOriginId: 4, //Online
            ReservationStatusId: 1, //Pending
            FirstName: e.target.firstName.value,
            LastName: e.target.lastName.value,
            Email: e.target.email.value,
            PhoneNumber: e.target.phoneNumber.value,
            RestaurantId: 1 // Bean Scene
        };
        
        var newReservation = fetchApi.reservations.create(reservationDto);

        // Date not posted to server, only passed to /Confirmation for visual date confirmation
        newReservation.then(data => {
            navigate("/Confirmation", { state: { newRes: { ...data, date, sitting } } });
        })              
    };

    return(
        <Container>
            <Row>
                <Col sm={12}>
                    <Form onSubmit={onSubmit}>
                        <FloatingLabel
                            controlId="firstName"
                            label="First Name"
                            className="my-3">
                            <Form.Control type="text" placeholder="John" />
                        </FloatingLabel>

                        <FloatingLabel
                            controlId="lastName"
                            label="Last Name"
                            className="mb-3">
                            <Form.Control type="text" placeholder="Smith" />
                        </FloatingLabel>

                        <FloatingLabel
                            controlId="phoneNumber"
                            label="Phone Number"
                            className="mb-3">
                            <Form.Control type="text" placeholder="04123456" />
                        </FloatingLabel>

                        <FloatingLabel
                            controlId="email"
                            label="Email Address"
                            className="mb-3">
                            <Form.Control type="email" placeholder="name@example.com" />
                        </FloatingLabel>

                        <FloatingLabel
                            controlId="customerNotes"
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