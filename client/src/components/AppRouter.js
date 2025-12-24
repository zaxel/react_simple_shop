import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import { Routes, Route, useLocation } from "react-router-dom";
import { Context } from '..';
import { authRoutes, publicRoutes, adminRoutes } from '../routes';
import PrivateRouteWrapper from '../utils/PrivateRouteWrapper';
import { LOGIN_ROUTE } from '../utils/consts/routes';


const AppRouter = observer(() => {
    const { user, history } = useContext(Context);
    let {pathname} = useLocation();

    useEffect(() => {
        if (pathname !== LOGIN_ROUTE) {
            history.setLastPath(pathname);
        }
    }, [pathname, history]);

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
                    {NestedComponent && NestedComponent()}
                </Route>
            })}
        </Routes>
    );
});

export default AppRouter;