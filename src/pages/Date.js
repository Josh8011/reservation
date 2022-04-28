import { findByPlaceholderText } from '@testing-library/dom';
import React from 'react';



export function Date(props){


    var Sittings = props.Sittings.Sittings
    var SittingsStart= []
    var SittingsByMonth = []


    if(Sittings)
    {

        for(let i = 0; i < Sittings.length; i++){
            SittingsStart.push( new Date(Sittings[i].start))
        }
        console.log(Sittings)
 
        // for(let i = 0; i < Sittings.length; i++){
        //     console.log(Sittings[i].start)
        //     newDateObject =  new Date(Sittings[i].start)
        //     Sittings[i].start = newDateObject
        // }


    
        // for(let i = 0; i < Sittings.length; i++){
        //     console.log(Sittings[i].start)
        //     console.log(Sittings[i].start.Date)    
        //     // if(i=0)
        //     // {
        //     //     Sittings[i].start.
        //     // }

        // }

    }



    return(
        <div>
            
        </div>
    );
}