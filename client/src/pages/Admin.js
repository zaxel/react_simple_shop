import React from 'react';
import AdminPanelNavbar from '../components/adminPanelComponents/AdminPanelNavbar';
import { Outlet } from 'react-router-dom';

const Admin = () => {
    return (
        <div className='account'>
            <AdminPanelNavbar />
            <Outlet />
        </div>
    );
};
export default Admin;