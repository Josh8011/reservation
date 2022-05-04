import {React, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Storage from '../Services/storage';
import {PeopleSelectionLink} from '../Components';
import './Css/People.css'



export function People(props){
    let navigate = useNavigate();
    var ResInfo = props.ResInfo
    var ChangePeople = props.ResFunctions.ChangePeople
    var SelectPage = props.SelectPage

    const [numberOfPeople, setNumberOfPeople] = useState(2);
    //Configurable minimum total people, maximum total people, default people value
    const peopleInfo = {min:1, max:12, people:2};

    useEffect(()=>{
        setNumberOfPeople(Storage.getSessionItem('reservationInfo',peopleInfo).people);
    },[]);


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
        let reservationInfo = Storage.getSessionItem('reservationInfo', {people: null, date: null, sitting: null, details:null})
        Storage.setSessionItem('reservationInfo',{...reservationInfo ,people:numberOfPeople})
        SelectPage("Date");
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
                <button type="button" class="btn btn-primary btn-lg" onClick={onContinueClick} >Continue</button>
            </div>

            </div>
        </div>
    );
}