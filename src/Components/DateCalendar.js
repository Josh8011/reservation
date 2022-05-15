import React from 'react';
import { DateCalendarGreyButton , DateCalendarDOW} from '../Components';
import './Css/DateCalendar.css'

export function DateCalendar (props){

    var selectedMonth = props.SelectedMonth 
    var dateSelectionBtns = props.DateSelectionBtns
    var title = "Please Select A month";


    if(selectedMonth)
    {
        var month = selectedMonth.Month
        var year = selectedMonth.Year
        var calendarDates = getcalendarDates(year, month )
        var title = new Date(year, month, 1).toLocaleString('default',{month: 'long'})
    }

    if(calendarDates)
    {
        let lastDayThisMonth = new Date(year, month + 1 , 0).getDate()
        let ThisMonth = false; 
        var availableDatesIndex = [];
        for(let i = 0; i < 43; i++)
        {
            if(calendarDates[i] === 1 && i < 10)
            {
                ThisMonth = true;                
            }
            if(ThisMonth === true && calendarDates[i] === lastDayThisMonth)
            {
                availableDatesIndex.push(i)
                ThisMonth = false;
            }
            if(ThisMonth === true )
            {
                availableDatesIndex.push(i)
            }
        }

        for(let index of availableDatesIndex)
        {
            for(let i = 0 ; i < dateSelectionBtns.length; i++)
            {
                if(calendarDates[index] == dateSelectionBtns[i].key){
                    calendarDates[index] = dateSelectionBtns[i]
                }
            }
        }


        for(let i = 0; i < calendarDates.length; i++)
        {   
            if(typeof calendarDates[i] == "number"){
                calendarDates[i] = <DateCalendarGreyButton
                key={i + 400}
                Number ={calendarDates[i]}/>
            }
        }

        
        for(let i = 7 ; i > 0; i--)
        {
            var date = new Date(2022,4,i);
            calendarDates.unshift(
                <DateCalendarDOW
                Day={ date.toLocaleString('en-US',{weekday:'short'})}
                />
                );
        }
    }




    

    return(
        <div className='DateCalendar'>
            {title}
            <div className='Calendar'>
            {calendarDates}

            </div>
        </div>
    );
}







function getcalendarDates(year, month)
{
    let first = new Date(year, month, 1);
    let firstday = first.getDay();
    let ldtm = new Date(year, month + 1 , 0)
    let lastDayThisMonth = ldtm.getDate()
    let number = 0;
    if(firstday > 0)
    {
        let lmonth = new Date(year, month, 0);
        var lastmonth = lmonth.getDate();
    }
    
    if(firstday === 0 )
    {
        number = 1
        var lastmonthcounter = false;
    }else{
        lastmonthcounter = true;
        number = lastmonth - firstday;
    }
    
    let output = new Array(42);
    
    for(let i = 0; i < 42; i++)
    {
        if(lastmonthcounter === true)
        {
            if(number === lastmonth)
            {
                number = 1;
                lastmonthcounter = false;
            }
        }
        if(lastmonthcounter === false && number > lastDayThisMonth)
        {
            number = 1
        }
        output[i] = number;
        number++;
    }
    return output;
}