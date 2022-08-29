import React from 'react';
import { Route } from "react-router-dom";
import { adminNavRoutes } from '../../routes';
import UsersAdminPanel from './users/UsersAdminPanel';

const AdminPanelRouter = () => {
    const userAdminRouts = adminNavRoutes.map(({ path, Component, NestedComponent }) => {
        return <Route key={path} path={path} element={<Component />}> 
                    {NestedComponent && NestedComponent()}
                </Route>
    })
    userAdminRouts.push(<Route key={Date.now()} index element={<UsersAdminPanel />} />)
    return userAdminRouts;
};

export default AdminPanelRouter;