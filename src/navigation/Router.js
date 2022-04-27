import React from 'react';
import { Route, Routes } from 'react-router-dom';
import {Home } from '../Pages/Index'

export function Router(){
    return(
        <Routes>
            <Route path='/' element={<Home/>}></Route>
        </Routes>
    )
}