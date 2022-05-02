import React from 'react';
import { isCompositeComponent } from 'react-dom/test-utils';
import { MonthSelectBtn , DateSelectionContainer} from '../Components';
import "./Css/DatePage.css"


export function DatePage(props){

    var Sittings = props.Sittings


    if(Sittings[0]){
        var SittingsByMonth = SortSittingsByMonth(Sittings);
        var distinctMonths = [...new Set(Sittings.map(x => x.month))];
        var distinctDayByMonth = []

        for(let i =0; i < distinctMonths.length; i++){
            distinctDayByMonth.push([...new Set(SittingsByMonth[i].map(x => x.day))])
        }

        console.log(distinctDayByMonth)
    }

    var MonthBtns = CreateMonthBtns(6);
   

    return(
        <div className="DatePageContainer">
            <div>
            {MonthBtns}
            </div>
            <div>
            {<DateSelectionContainer/>}
            </div>
        </div>
    );
}

function CreateMonthBtns(NumberOfBtns){
    var currentDate = new Date();
    var MonthBtns = [];
    for(let i = 0; i < NumberOfBtns; i++)
    {
        MonthBtns.push( <MonthSelectBtn key={i} MonthNumber={currentDate.getMonth()}  Month={currentDate.toLocaleString('default', { month: 'long' })}/>)
        currentDate.setMonth(currentDate.getMonth()+1)
    }

    return(MonthBtns)
}



function SortSittingsByMonth(Sittings){
    var AllSittingsByMonth = []
    var MonthSittings = []
    var CurrentMonth = Sittings[0].month;
 
    for(let i = 0; i < Sittings.length; i++){
        
        if(Sittings[i].month == CurrentMonth)
        {
            MonthSittings.push(Sittings[i])
        }
        if(Sittings[i].month != CurrentMonth){
            CurrentMonth = Sittings[i].month
            AllSittingsByMonth.push(MonthSittings)
            MonthSittings = []
        }
        if(i == Sittings.length-1)
        {
            AllSittingsByMonth.push(MonthSittings)
        }           
    }

    return AllSittingsByMonth;
}