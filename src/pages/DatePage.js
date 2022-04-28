import React from 'react';
import { MonthSelectBtn , Header} from '../Components';



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

    var currentDate = new Date();

    var MonthBtns = []

    for(let i = 0; i < 6; i++)
    {
        console.log(currentDate.getMonth);
        MonthBtns.push( <MonthSelectBtn key={i} month={currentDate.setMonth(currentDate.getMonth + i) }/>)
    }


    return(
        <div>
            Date
            {MonthBtns}
    
        </div>
    );
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