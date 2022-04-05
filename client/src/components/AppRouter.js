import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Routes, Route } from "react-router-dom";
import { Context } from '..';
import Basket from '../pages/Basket';
import { authRoutes, publicRoutes, adminRoutes } from '../routes';

const AppRouter = observer(() => {
    const {user, device} = useContext(Context);

    
    return (
        <Routes>
            {user.isAuth && authRoutes.map(({path, Component})=>{
                return <Route key={path} path={path} element={<Component />} />    
            })}
            {user.isAuth && user.isSuperUser && adminRoutes.map(({path, Component})=>{
                return <Route key={path} path={path} element={<Component />} />    
            })}
            {publicRoutes.map(({path, Component})=>{
                return <Route key={path} path={path} element={<Component />} />    
            })}
        </Routes>
    );
});

export default AppRouter;