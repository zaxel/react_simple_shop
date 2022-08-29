import React from 'react';
import { Outlet } from 'react-router-dom';
import PagesPanelNavbar from './PagesPanelNavbar';

const PagesAdminPanel = () => {
    return (
        <div className='account'>
            <PagesPanelNavbar />
            <Outlet />
        </div>
    );
};
export default PagesAdminPanel;