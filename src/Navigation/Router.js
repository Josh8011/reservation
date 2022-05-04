import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { People, DatePage, Sitting, Details, Confirmation } from '../Pages'





export function Router(props){

    var ResFunctions = props.ResFunctions
    var ResInfo = props.ResInfo
    var SelectPage = props.SelectPage
    var Sittings = props.Sittings

    return(
        <Routes>
            <Route path='/' element={<People ResFunctions={ResFunctions} ResInfo={ResInfo}  SelectPage={SelectPage}/>}></Route>
            <Route path='/People' element={<People ResFunctions={ResFunctions} ResInfo={ResInfo} SelectPage={SelectPage} />}></Route>
            <Route path='/DatePage' element={<DatePage ResFunctions={ResFunctions} ResInfo={ResInfo} SelectPage={SelectPage} Sittings={Sittings} />}></Route>
            <Route path='/Sitting' element={<Sitting ResFunctions={ResFunctions} ResInfo={ResInfo} SelectPage={SelectPage} />}></Route>
            <Route path='/Details' element={<Details rResFunctions={ResFunctions} ResInfo={ResInfo} SelectPage={SelectPage} />}></Route>
            <Route path='/Confirmation' element={<Confirmation />}></Route>
        </Routes>
    )
}