import React, { useContext } from 'react';
import { Routes, Route } from "react-router-dom";
import { Context } from '..';
import Basket from '../pages/Basket';
import { authRoutes, publicRoutes } from '../routes';

const AppRouter = () => {
    const {user, device} = useContext(Context);

    console.log(666, device.types)
    return (
        <Routes>
            {user.isAuth && authRoutes.map(({path, Component})=>{
                return <Route key={path} path={path} element={<Component />} />    
            })}
            {publicRoutes.map(({path, Component})=>{
                return <Route key={path} path={path} element={<Component />} />    
            })}
        </Routes>
    );
};

export default AppRouter;