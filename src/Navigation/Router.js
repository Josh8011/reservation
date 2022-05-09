import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { People, DatePage, Sitting, Details, Confirmation } from '../Pages'





export function Router(props){

    var ResFunctions = props.ResFunctions

    return(
        <Routes>
            <Route path='/' element={<People ResFunctions={ResFunctions}/>}></Route>
            <Route path='/People' element={<People ResFunctions={ResFunctions} />}></Route>
            <Route path='/Date' element={<DatePage ResFunctions={ResFunctions} />}></Route>
            <Route path='/Sitting' element={<Sitting ResFunctions={ResFunctions} />}></Route>
            <Route path='/Details' element={<Details ResFunctions={ResFunctions} />}></Route>
            <Route path='/Confirmation' element={<Confirmation ResFunctions={ResFunctions} />}></Route>
        </Routes>
    )
}