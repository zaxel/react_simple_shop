import React from 'react';
import { Outlet } from 'react-router-dom';
import AccountNavbar from '../components/userProfile/AccountNavbar';
const AccountPage = () => {
    return (
        <div className='account'>
            <AccountNavbar />
            <Outlet />
        </div>
    );
};

export default AccountPage;