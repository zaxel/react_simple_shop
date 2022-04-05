import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Routes, Route } from "react-router-dom";
import { Context } from '..';
import Basket from '../pages/Basket';
import { authRoutes, publicRoutes, adminRoutes } from '../routes';
import PrivateRouteWrapper from './PrivateRouteWrapper';

const AppRouter = observer(() => {
    const {user, device} = useContext(Context);

    
    return (
        <Routes>
            {authRoutes.map(({path, Component})=>{
                return <Route key={path} path={path} element={
                <PrivateRouteWrapper>
                    <Component />
                </PrivateRouteWrapper>
                } />    
            })}
            {user.isAuth && user.isSuperUser && adminRoutes.map(({path, Component})=>{
                return <Route key={path} path={path} element={
                <PrivateRouteWrapper>
                    <Component />
                </PrivateRouteWrapper>} />    
            })}
            {publicRoutes.map(({path, Component})=>{
                return <Route key={path} path={path} element={<Component />} />    
            })}
        </Routes>
    );
});

export default AppRouter;