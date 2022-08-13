import React from 'react';
import { Route } from "react-router-dom";
import { userNavRoutes } from '../../routes';
import Info from './Info';

const AccountRouter = () => {
    const userRouts = userNavRoutes.map(({ path, Component }) => {
        return <Route key={path} path={path} element={
            <Component />
        } />
    })
    userRouts.push(<Route key={Math.random()} index element={<Info />} />)
    return userRouts;
};

export default AccountRouter;