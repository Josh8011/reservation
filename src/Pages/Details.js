import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation} from 'react-router-dom';
import { Row, Form, Container, Col, FloatingLabel, Button } from 'react-bootstrap';
import { fetchApi } from '../Services/Api';
import { CustomerBtn} from '../Components';
import "./Css/Details.css"
import searchIcon from '../Components/Images/search.png'
import closeIcon from '../Components/Images/close.png'
import Storage from '../Services/storage';


export function Details(props){
    var updateRes = props.ResFunctions.UpdateReservationInfo;
    var resInfo = props.ResFunctions.reservationInfo;
    var setSelected = props.ResFunctions.setSelected;
    var startDateTime = new Date(props.ResFunctions.reservationInfo.sitting.StartDateTime);
    const noOfPeople = resInfo.people;
    const date = resInfo.date;
    const sitting = resInfo.sitting;
    const navigate = useNavigate();
    const location = useLocation();
    const searchRef = useRef(null);

    const [details, setDetails] = useState({firstName: "", lastName: "", phoneNumber: "", email: "", customerNotes: "", id: "", resStatus: "1", resOrigin: "1"});
    const [searchToggle, setSearchToggle] = useState(false);
    const [searchData, setSearchData] = useState("");
    const [customerList, setCustomerList] = useState();
    const [displayCustomers, setDisplayCustomers] = useState();
    const [isDisabled, setIsDisabled] = useState(false);

    useEffect(()=>{
        setSelected(location.pathname.replace(/\//g,''))
        } ,[]);

        useEffect(()=>{
            if(resInfo.details){
                setDetails(resInfo.details)
            }
            else{
                updateRes('details', details)
            }
        } ,[resInfo]);

        
        useEffect(()=>{
            if(searchData){
                fetchApi.persons.findPeople(searchData)
                    .then(data => {
                setCustomerList(...[data]);
                });
            }
            else{
                setCustomerList([]);
            }
        } ,[searchData]);
                
        useEffect(()=>{
            let customerArray = []
            if(customerList){
                setDisplayCustomers(customerList.map((c,i)=>
                    <CustomerBtn
                        key = {i}
                        id = {c.id}
                        firstName = {c.firstName}
                        lastName = {c.lastName}
                        phoneNumber = {c.phoneNumber}
                        email = {c.email}
                        clickCustomerBtn = {()=>clickCustomerBtn(c)}
                    />))
            }
        } ,[customerList,details]);

    

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
            ReservationOriginId: e.target.resOrigin.value, //Online
            ReservationStatusId: e.target.resStatus.value, //Pending
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

    function onSearchChange(event){
        let input = event.target.value;
        setSearchData(input)
    }

    function clickCustomerBtn(customer){

        setDetails({
            firstName: customer.firstName, 
            lastName: customer.lastName, 
            phoneNumber: customer.phoneNumber, 
            email: customer.email, 
            id: customer.id});

        toggleSearchBar();
        setIsDisabled(true);
    }

    function toggleSearchBar(){
        setSearchData("");
        setSearchToggle(!searchToggle);
    }

    function clearBtnClick(){
        setDetails({firstName: "", lastName: "", phoneNumber: "", email: "", customerNotes: "", id: "", resStatus: "1", resOrigin: "1"});
        setIsDisabled(false);
    }

    
    useEffect(()=>{
        if(searchToggle){
            searchRef.current.focus();
        }
    } ,[searchToggle]);


    return(
        <div className='container'>
            <div className='searchCustomer'>
                <div className={searchToggle?'searchBar':'searchBarHidden'}>
                    <img className={searchToggle?"searchIconClose":"searchIcon"} src={searchIcon} onClick={()=>toggleSearchBar()}/>
                    {searchToggle?
                    <input value={searchData}
                        ref={searchRef}
                        onInput={onSearchChange}
                        type="text" 
                        className="searchInput" 
                        placeholder="Search for customer..." 
                        />
                        :<div/>
                    }
                    {searchToggle?
                        <img className="closeIcon" src={closeIcon} onClick={()=>toggleSearchBar()}/>
                        :<div/>
                    }
                </div>
                <div className='customerList'>
                    {displayCustomers}
                </div>
            </div>
            
            <div className={searchToggle?'customerDetailsHidden':'customerDetails'}>
                <Container>
                    <Row>
                        <Col sm={12}>
                            <Form onSubmit={onSubmit}>
                                <FloatingLabel
                                    controlId="firstName"
                                    label="First Name"
                                    className="my-3">
                                    <Form.Control value={details.firstName} onInput={onDataChange} type="text" placeholder="John" disabled={isDisabled} required/>
                                </FloatingLabel>

                                <FloatingLabel
                                    controlId="lastName"
                                    label="Last Name"
                                    className="mb-3">
                                    <Form.Control value={details.lastName} onInput={onDataChange} type="text" placeholder="Smith" disabled={isDisabled} required/>
                                </FloatingLabel>

                                <FloatingLabel
                                    controlId="phoneNumber"
                                    label="Phone Number"
                                    className="mb-3">
                                    <Form.Control value={details.phoneNumber} onInput={onDataChange} type="text" placeholder="04123456" disabled={isDisabled} required/>
                                </FloatingLabel>

                                <FloatingLabel
                                    controlId="email"
                                    label="Email Address"
                                    className="mb-3">
                                    <Form.Control value={details.email} onInput={onDataChange} type="email" placeholder="name@example.com" disabled={isDisabled} required/>
                                </FloatingLabel>

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


                                <div className="Container d-flex">
                                    <div className='col-6 pe-1'>
                                        <FloatingLabel
                                            controlId="resOrigin"
                                            label="Origin"
                                            className="mb-3">
                                            <Form.Select value={details.resOrigin} onChange={onDataChange} aria-label="Default select example">
                                                <option value="1">In Person</option>
                                                <option value="2">Email</option>
                                                <option value="3">Phone</option>
                                                <option value="4">Online</option>
                                            
                                            </Form.Select>
                                        </FloatingLabel>
                                    </div>
                                    <div className='col-6 ps-1'>
                                        <FloatingLabel
                                            controlId="resStatus"
                                            label="Status"
                                            className="mb-3">
                                            <Form.Select value={details.resStatus} onChange={onDataChange} aria-label="Default select example">
                                                <option value="1">Pending</option>
                                                <option value="2">Confirmed</option>
                                                <option value="4">Seated</option>
                                            </Form.Select>
                                        </FloatingLabel>
                                    </div>
                                </div>

                                <Row>
                                    <Col>
                                        <Button variant="success" type="submit" size="lg" className="w-100">
                                            Submit
                                        </Button>
                                    </Col>
                                    <Col>
                                        <Button variant="danger" size="lg" className="w-100" onClick={()=>clearBtnClick()}>
                                            Clear
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
        
    );

}