import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation} from 'react-router-dom';
import { Row, Form, Container, Col, FloatingLabel, Button } from 'react-bootstrap';
import { fetchApi } from '../Services/Api';
import Storage from '../Services/storage';


export function Details(props){

    const updateRes = props.ResFunctions.UpdateReservationInfo;
    const resInfo = props.ResFunctions.reservationInfo;
    const setSelected = props.ResFunctions.setSelected;
    const startDateTime = new Date(props.ResFunctions.reservationInfo.sitting.StartDateTime);
    const noOfPeople = resInfo.people;
    const date = resInfo.date;
    const sitting = resInfo.sitting;
    const navigate = useNavigate();
    const location = useLocation();
    const [userData, setUserData] = useState();

    const [details, setDetails] = useState({firstName: "", lastName: "", phoneNumber: "", email: "", customerNotes: ""});

    useEffect(()=>{
        (async()=>{
            await fetchApi.persons.getUser()
              .then (data => {
                 setUserData(data);
              })
        })();
        setSelected(location.pathname.replace(/\//g,''))
        } ,[]);

        useEffect(()=>{
            debugger;
            if(userData?.length > 0){
                setDetails({firstName: userData[0].firstName, lastName: userData[0].lastName, phoneNumber: userData[0].phoneNumber, email: userData[0].email, 
                    customerNotes: ""})
            }
            else if(resInfo?.details){
                setDetails(resInfo.details)
            }
            else{
                updateRes('details', details)
            }
            } ,[userData]);

    

    function onDataChange(event){
        let newDetails = {...details, [event.target.id]:event.target.value};
        setDetails(newDetails);
        updateRes('details',newDetails);
    }
    
        const onSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
            let resStart = `${startDateTime.getFullYear()}-${addPadding(startDateTime.getMonth()+1)}-${addPadding(startDateTime.getDate())}T${addPadding(startDateTime.getHours())}:${addPadding(startDateTime.getMinutes())}`
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
            RestaurantId: 1, // Bean Scene
            StartTime:  resStart
            //"2022-04-08T12:30"
        };
        
        var newReservation = fetchApi.reservations.create(reservationDto);         

        // Date not posted to server, only passed to /Confirmation for visual date confirmation
        newReservation.then(data => {
            if(data.error){
                navigate("/Contact");
            }
            else{
                navigate("/Confirmation", { state: { newRes: { ...data, date, sitting } } });
            }
        });             
    };

    function addPadding(num){
        //return num.toString().padStart(2,'0');
        return num<10 ? '0'+num : num;
    }

    return(
        <div className="container">
            <Row>
                <Col sm={12}>
                    <Form onSubmit={onSubmit}>
                        <Row>
                            <div className="col-6">
                                <FloatingLabel
                                    controlId="firstName"
                                    label="First Name"
                                    className="mb-3">
                                    <Form.Control value={details.firstName} onInput={onDataChange} type="text" placeholder="John"/>
                                </FloatingLabel>
                            </div>
                            <div className="col-6">
                                <FloatingLabel
                                    controlId="lastName"
                                    label="Last Name"
                                    className="mb-3">
                                    <Form.Control value={details.lastName} onInput={onDataChange} type="text" placeholder="Smith" />
                                </FloatingLabel>
                            </div>
                        </Row>
                        <Row>
                            <div className="col-6">
                                <FloatingLabel
                                    controlId="phoneNumber"
                                    label="Phone Number"
                                    className="mb-3">
                                    <Form.Control value={details.phoneNumber} onInput={onDataChange} type="text" placeholder="04123456" />
                                </FloatingLabel>
                            </div>
                            <div className="col-6">
                                <FloatingLabel
                                    controlId="email"
                                    label="Email Address"
                                    className="mb-3">
                                    <Form.Control value={details.email} onInput={onDataChange} type="email" placeholder="name@example.com" />
                                </FloatingLabel>
                            </div>
                        </Row>
                        <FloatingLabel
                            controlId="customerNotes"
                            label={details.customerNotes?`Notes ${details.customerNotes.length}/255`:"Notes"}
                            className="mb-3">
                            <Form.Control 
                                value={details.customerNotes} 
                                onInput={onDataChange} 
                                as="textarea"
                                style={{ height: '100px' }}
                                placeholder="E.g., One high chair please." 
                                maxLength="255"
                            />
                        </FloatingLabel>

                        <Row>
                            <Col>
                                <Button variant="success" type="submit" size="lg" className="w-100">
                                    Submit
                                </Button>
                            </Col>
                            <Col>
                                <Button variant="danger" size="lg" className="w-100" onClick={()=>setDetails({firstName: "", lastName: "", phoneNumber: "", email: "", customerNotes: ""})}>
                                    Clear
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </div>
    );

}