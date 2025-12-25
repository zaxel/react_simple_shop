import React from 'react';
import AdminPanelNavbar from '../components/adminPanel/AdminPanelNavbar';
import { Outlet } from 'react-router-dom';

const Admin = () => {
    return (
        <div className='account min-h-[92dvh]'>
            <AdminPanelNavbar />
            <Outlet />
        </div>
    );
};
export default Admin;