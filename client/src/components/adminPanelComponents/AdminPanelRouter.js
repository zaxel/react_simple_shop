﻿import React from 'react';
import { Route } from "react-router-dom";
import { adminNavRoutes } from '../../routes';
import UsersAdminPanel from './UsersAdminPanel';

const AdminPanelRouter = () => {
    const userAdminRouts = adminNavRoutes.map(({ path, Component }) => {
        return <Route key={path} path={path} element={
            <Component />
        } />
    })
    userAdminRouts.push(<Route key={Math.random()} index element={<UsersAdminPanel />} />)
    return userAdminRouts;
};

export default AdminPanelRouter;