import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { People, Date, Sitting, Details} from '../Pages'





export function Router(props){

    var ResFunctions = props.ResFunctions
    var ResInfo = props.ResInfo
    var SelectPage = props.SelectPage


    return(
        <Routes>
            <Route path='/' element={<People ResFunctions={ResFunctions} ResInfo={ResInfo}  SelectPage={SelectPage}/>}></Route>
            <Route path='/People' element={<People ResFunctions={ResFunctions} ResInfo={ResInfo} SelectPage={SelectPage} />}></Route>
            <Route path='/Date' element={<Date ResFunctions={ResFunctions} ResInfo={ResInfo} SelectPage={SelectPage} />}></Route>
            <Route path='/Sitting' element={<Sitting ResFunctions={ResFunctions} ResInfo={ResInfo} SelectPage={SelectPage} />}></Route>
            <Route path='/Details' element={<Details rResFunctions={ResFunctions} ResInfo={ResInfo} SelectPage={SelectPage} />}></Route>
        </Routes>
    )
}