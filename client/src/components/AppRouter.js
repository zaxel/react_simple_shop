import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Routes, Route } from "react-router-dom";
import { Context } from '..';
import { authRoutes, publicRoutes, adminRoutes } from '../routes';
import PrivateRouteWrapper from '../utils/PrivateRouteWrapper';


const AppRouter = observer(() => {
    const { user, device } = useContext(Context);
    
    return (
        <Routes>
            {authRoutes.map(({ path, Component, NestedComponent }) => {
                return <Route key={path} path={path} element={
                    <PrivateRouteWrapper>
                        <Component />
                    </PrivateRouteWrapper>
                } >
                    {//nested routes - user account routes
                    NestedComponent && NestedComponent()}
                </Route>
            })}
            {user.isAuth && user.isSuperUser && adminRoutes.map(({ path, Component, NestedComponent }) => {
                return <Route key={path} path={path} element={
                    <PrivateRouteWrapper>
                        <Component />
                    </PrivateRouteWrapper>} >
                        {//nested routes - user account routes
                        NestedComponent && NestedComponent()}
                    </Route>
            })}
            {publicRoutes.map(({ path, Component, NestedComponent }) => {
                return <Route key={path} path={path} element={<Component />} >
                    {//nested routes - user account routes
                    NestedComponent && NestedComponent()}
                </Route>
            })}
        </Routes>
    );
});

export default AppRouter;