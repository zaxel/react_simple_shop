import React from 'react';
import { Route } from "react-router-dom";
import { userNavRoutes } from '../../routes';
import UserInfo from './UserInfo';

const UserAccountRouter = () => {
    const userRouts = userNavRoutes.map(({ path, Component }) => {
        return <Route key={path} path={path} element={
            <Component />
        } />
    })
    userRouts.push(<Route key={Math.random()} index element={<UserInfo />} />)
    return userRouts;
};

export default UserAccountRouter;