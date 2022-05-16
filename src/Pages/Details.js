import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation} from 'react-router-dom';
import { Row, Form, Container, Col, FloatingLabel, Button } from 'react-bootstrap';
import { fetchApi } from '../Services/Api';

export function Details(props){

    const updateRes = props.ResFunctions.UpdateReservationInfo;
    const resInfo = props.ResFunctions.reservationInfo;
    const setSelected = props.ResFunctions.setSelected;
    const noOfPeople = resInfo.people;
    const date = resInfo.date;
    const sitting = resInfo.sitting;
    const navigate = useNavigate();
    const location = useLocation();

    const [details, setDetails] = useState({firstName: "", lastName: "", phoneNumber: "", email: "", customerNotes: ""});

    useEffect(()=>{
        setSelected(location.pathname.replace(/\//g,''))
        if(!resInfo.details){
            updateRes('details',details)
        }
        else{
            setDetails(resInfo.details)
        }
        } ,[]);

    function onDataChange(event){
        let newDetails = {...details, [event.target.id]:event.target.value};
        setDetails(newDetails);
        updateRes('details',newDetails);
    }
    
        const onSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();

        let reservationDto = {
            CustomerNotes: e.target.customerNotes.value,
            NoOfGuests : noOfPeople,
            SittingId: sitting.Id,
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
                            <Form.Control value={details.firstName} onInput={onDataChange} type="text" placeholder="John"/>
                        </FloatingLabel>

                        <FloatingLabel
                            controlId="lastName"
                            label="Last Name"
                            className="mb-3">
                            <Form.Control value={details.lastName} onInput={onDataChange} type="text" placeholder="Smith" />
                        </FloatingLabel>

                        <FloatingLabel
                            controlId="phoneNumber"
                            label="Phone Number"
                            className="mb-3">
                            <Form.Control value={details.phoneNumber} onInput={onDataChange} type="text" placeholder="04123456" />
                        </FloatingLabel>

                        <FloatingLabel
                            controlId="email"
                            label="Email Address"
                            className="mb-3">
                            <Form.Control value={details.email} onInput={onDataChange} type="email" placeholder="name@example.com" />
                        </FloatingLabel>

                        <FloatingLabel
                            controlId="customerNotes"
                            label="Notes"
                            className="mb-3">
                            <Form.Control 
                                value={details.customerNotes} 
                                onInput={onDataChange} 
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