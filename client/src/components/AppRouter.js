import React from 'react';
import { Routes, Route } from "react-router-dom";
import Basket from '../pages/Basket';
import { authRoutes, publicRoutes } from '../routes';

const AppRouter = () => {
    const isAuth = false;

    return (
        <Routes>
            {isAuth && authRoutes.map(({path, Component})=>{
                return <Route key={path} path={path} element={<Component />} />    
            })}
            {publicRoutes.map(({path, Component})=>{
                return <Route key={path} path={path} element={<Component />} />    
            })}
        </Routes>
    );
};

export default AppRouter;