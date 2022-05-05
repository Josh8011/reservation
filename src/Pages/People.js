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
    const [peopleError, setPeopleError] = useState(false);
    //Configurable minimum total people, maximum total people, default people value
    const peopleInfo = {min:1, max:12, default:2};

    useEffect(()=>{
        setNumberOfPeople(ResInfo.people?ResInfo.people:peopleInfo.default);
    },[ResInfo]);

//Refresh saves displayed value, instead of stored
    function onPeopleChange(event){
        let input = event.target.value
        console.log(input);
        if(input!==''){
            let total = Math.trunc(Math.abs(Number(input)));
                //if input = 0 default to people.min 
                //else if input > max default to max
                //else set to input value
            total = total===0 ? peopleInfo.default : total>peopleInfo.max ? peopleInfo.max : total
            setNumberOfPeople(total);
            UpdatePeople('people', total);
            if(peopleError){
                setPeopleError(false);
            }
        }
        else{
            setNumberOfPeople('');
        }
    }
    function buttonIncrement(value){
        let tempPeople = Number(numberOfPeople);
        tempPeople+=value;
        if(tempPeople>=peopleInfo.min && tempPeople<=peopleInfo.max){
        }
        else{
            tempPeople=tempPeople<peopleInfo.min?peopleInfo.min:peopleInfo.max
        }
            setNumberOfPeople(tempPeople);
            UpdatePeople('people', tempPeople);
            if(peopleError){
                setPeopleError(false);
            }
    }

    function onContinueClick()
    {
        if(numberOfPeople>=peopleInfo.min&&numberOfPeople<=peopleInfo.max){
            SelectPage("date");
            navigate("/DatePage");
        }
        else{
            setPeopleError(true);
        }
    }

    return(
        <div className='PeopleBody'>
            Number of Guests
            <div className='PeopleSelectionContainer'>

            <div className="input-group w-75">
                <input value={numberOfPeople} onInput={onPeopleChange} type="number" className="form-control text-center" placeholder="Guests" onKeyDown={(evt) => ["e", "E", "+", "-", "."].includes(evt.key) && evt.preventDefault()}/>
                <button className="btn btn-outline-danger btn-lg" type="button" onClick={()=>buttonIncrement(-1)} >-</button>
                <button className="btn btn-outline-success btn-lg" type="button" onClick={()=>buttonIncrement(1)} >+</button>
            </div>
            

            {numberOfPeople===peopleInfo.max?
            <div>If you wish to make a reservation for more than {peopleInfo.max} people please contact the restaurant (LINK TO CONTACT PAGE)</div>
            :<div></div>}
            {peopleError?
            <div>Please enter a valid number of guests {peopleInfo.min}-{peopleInfo.max}.</div>
            :<div></div>}

            <div className="input-group row w-75 pt-2">
                <button type="button" className="btn btn-primary btn-lg" onClick={onContinueClick} >Continue</button>
            </div>

            </div>
        </div>
    );
}