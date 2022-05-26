import {React, useEffect, useState} from 'react';
import { useNavigate, useLocation} from 'react-router-dom';
import './Css/People.css'


export function People(props){
    const navigate = useNavigate();
    const location = useLocation();
    var ResInfo = props.ResFunctions.reservationInfo
    var UpdatePeople = props.ResFunctions.UpdateReservationInfo
    var setSelected = props.ResFunctions.setSelected

    const [numberOfPeople, setNumberOfPeople] = useState('');
    const [peopleError, setPeopleError] = useState(false);
    //Configurable minimum total people, maximum total people, default people value
    const peopleInfo = {min:1, max:12, default:2};

    useEffect(()=>{
        setSelected(location.pathname.replace(/\//g,''))
    },[]);

    useEffect(()=>{
        setNumberOfPeople(ResInfo.people?ResInfo.people:peopleInfo.default);
    },[ResInfo]);

//Refresh saves displayed value, instead of stored
    function onPeopleChange(event){
        let input = event.target.value
        if(input!==''){
                //if input < min default to people.min 
                //else if input > max default to max
                //else set to input value
            let total = input<peopleInfo.min ? peopleInfo.min : input>peopleInfo.max ? peopleInfo.max : Math.trunc(Math.abs(Number(input)))
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
            tempPeople=tempPeople<peopleInfo.min?peopleInfo.min:peopleInfo.max;
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
            //SelectPage("date");
            navigate("/date");
            if(!ResInfo.people){
                UpdatePeople('people', numberOfPeople);
            }
        }
        else{
            setPeopleError(true);
        }
    }

    return(
        <div className='PeopleBody'>
            Number of Guests
            <div className='PeopleSelectionContainer'>

                {/* <div className="input-group w-75">
                    <input value={numberOfPeople} onInput={onPeopleChange} type="number" className="form-control text-center " placeholder="Guests" onKeyDown={(evt) => ["e", "E", "+", "-", "."].includes(evt.key) && evt.preventDefault()}/>
                    <button className="btn btn-danger btn-lg" type="button" onClick={()=>buttonIncrement(-1)} >-</button>
                    <button className="btn btn-success btn-lg" type="button" onClick={()=>buttonIncrement(1)} >+</button>
                </div> */}

                <div className="input-group d-flex justify-content-center w-100">
                    <div className="form-group">
                        <input value={numberOfPeople} onInput={onPeopleChange}
                            type="number" 
                            className="peopleInput" 
                            placeholder="Guests" 
                            onKeyDown={(evt) => ["e", "E", "+", "-", "."].includes(evt.key) && evt.preventDefault() }
                            />
                    
                        <button className="btnMinus" type="button" onClick={()=>buttonIncrement(-1)} >-</button>
                        <button className="btnPlus" type="button" onClick={()=>buttonIncrement(1)} >+</button>
                    </div>
                </div>

                <div className="input-group d-flex justify-content-center">
                    
                    {numberOfPeople===peopleInfo.max?
                    <div>If you wish to make a reservation for more than {peopleInfo.max} people please contact the restaurant (LINK TO CONTACT PAGE)</div>
                    :<div></div>}
                    {peopleError?
                    <div>Please enter a valid number of guests {peopleInfo.min}-{peopleInfo.max}.</div>
                    :<div></div>}

                </div>

                <div className="input-group row pt-2 d-flex justify-content-center">
                    <button type="button" className="btn btn-primary btn-lg" onClick={onContinueClick} >Continue</button>
                </div>

            </div>
        </div>
    );
}