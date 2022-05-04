import {React, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Storage from '../Services/storage';
import {PeopleSelectionLink} from '../Components';
import './Css/People.css'



export function People(props){
    let navigate = useNavigate();
    var ResInfo = props.ResFunctions.reservationInfo
    var UpdatePeople = props.ResFunctions.UpdateReservationInfo
    var SelectPage = props.ResFunctions.SelectPage

    const [numberOfPeople, setNumberOfPeople] = useState();
    //Configurable minimum total people, maximum total people, default people value
    const peopleInfo = {min:1, max:12, default:2};

    useEffect(()=>{
        setNumberOfPeople(ResInfo.people?ResInfo.people:peopleInfo.default);
    },[ResInfo]);


    function onPeopleChange(event){
        let total = Number(event.target.value);
            //if input = 0 default to people.min 
            //else if input > max default to max
            //else set to input value
        setNumberOfPeople(total===0 ? peopleInfo.min : total>peopleInfo.max ? peopleInfo.max : total)
    }

    function buttonIncrement(value){
        let tempPeople = Number(numberOfPeople);
        tempPeople+=value;
        if(tempPeople>=peopleInfo.min && tempPeople<peopleInfo.max){
            setNumberOfPeople(tempPeople);
        }
        else{
            setNumberOfPeople(tempPeople<peopleInfo.min?peopleInfo.min:peopleInfo.max);
        }
    }

    function onContinueClick()
    {
        UpdatePeople('people', numberOfPeople);
        SelectPage("date");
        navigate("/DatePage");
    }

    return(
        <div className='PeopleBody'>
            Number of Guest
            <div className='PeopleSelectionContainer'>

            <div className="input-group w-75">
                <input value={numberOfPeople} onChange={onPeopleChange} type="number" className="form-control text-center" placeholder="Number of guests" min='0' max='16'/>
                <button className="btn btn-outline-danger btn-lg" type="button" onClick={()=>buttonIncrement(-1)} >-</button>
                <button className="btn btn-outline-success btn-lg" type="button" onClick={()=>buttonIncrement(1)} >+</button>
            </div>
            

            {numberOfPeople===peopleInfo.max?
            <div>If you wish to make a reservation for more than {peopleInfo.max} people please contact the restaurant (LINK TO CONTACT PAGE)</div>
            :<div><br/></div>}

            <div className="input-group row w-75 pt-2">
                <button type="button" className="btn btn-primary btn-lg" onClick={onContinueClick} >Continue</button>
            </div>

            </div>
        </div>
    );
}