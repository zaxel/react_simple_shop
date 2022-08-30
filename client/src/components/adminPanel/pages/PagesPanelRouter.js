import React, { useEffect } from 'react';
import { Route } from "react-router-dom";
import { adminPagesRoutes } from '../../../routes';
import AppAdmin from './ourApps/AppAdmin';

const PagesPanelRouter = () => {
    const pagesAdminRouts = adminPagesRoutes.map(({ path, Component }) => {
        return <Route key={path} path={path} element={
            <Component />
        } />
    })
    pagesAdminRouts.push(<Route key={Date.now()} index element={<AppAdmin />} />)
    return pagesAdminRouts;
};

export default PagesPanelRouter;