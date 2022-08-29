import React, { useEffect } from 'react';
import { Route } from "react-router-dom";
import { adminPagesRoutes } from '../../../routes';
import AboutAdmin from './AboutAdmin';

const PagesPanelRouter = () => {
    const pagesAdminRouts = adminPagesRoutes.map(({ path, Component }) => {
        return <Route key={path} path={path} element={
            <Component />
        } />
    })
    pagesAdminRouts.push(<Route key={Date.now()} index element={<AboutAdmin />} />)
    return pagesAdminRouts;
};

export default PagesPanelRouter;