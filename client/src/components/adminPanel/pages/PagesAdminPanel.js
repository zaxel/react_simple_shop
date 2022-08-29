import React from 'react';
import { Outlet } from 'react-router-dom';
import PagesPanelNavbar from './PagesPanelNavbar';

const PagesAdminPanel = () => {
    return (
        <div className='account__pages admin-pages'>
            <PagesPanelNavbar />
            <Outlet />
        </div>
    );
};
export default PagesAdminPanel;