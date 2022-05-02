import React, { useState } from 'react';
import { MonthSelectBtn , DateSelectionContainer} from '../Components';
import "./Css/DatePage.css"


export function DatePage(props){

    var Sittings = props.Sittings
    var currentDate = new Date();
    //Create Month buttons array 
    var monthBtns = CreateMonthBtns(6,currentDate);
    // do we want this to defaul to the current month or do we want it to be selected. I like default ###################
    const [selectedMonth, setSelectedMonth] = useState(); 

    

    //Manage Data 
    if(Sittings[0]){
        var sittingsByMonth = SortSittingsByMonth(Sittings);
        var distinctMonths = [...new Set(Sittings.map(x => x.month))];
        var distinctDayByMonth = []

        for(let i =0; i < distinctMonths.length; i++){
            distinctDayByMonth.push([...new Set(sittingsByMonth[i].map(x => x.day))])
        }


        
        console.log(distinctDayByMonth)
    }
    
    function CreateMonthBtns(NumberOfBtns, currentDate){
        var MonthBtns = [];
        for(let i = 0; i < NumberOfBtns; i++)
        {
            MonthBtns.push( 
                <MonthSelectBtn key={i}
                 SelectedMonthNumber={currentDate.getMonth() + 1}
                 Month={currentDate.toLocaleString('default', { month: 'long' })}
                 />)
    
            currentDate.setMonth(currentDate.getMonth()+1)
        }
    
        return(MonthBtns)
    }
    

    return(
        <div className="DatePageContainer">
            <div>
            {monthBtns}
            </div>
            <div>
            {<DateSelectionContainer SelectedMonth={selectedMonth} />}
            </div>
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