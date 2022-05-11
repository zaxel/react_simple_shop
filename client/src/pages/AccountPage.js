import React from 'react';
import { Outlet } from 'react-router-dom';
import AccountNavbar from '../components/userProfileComponents/AccountNavbar';
import UserAccountRouter from '../components/userProfileComponents/UserAccountRouter';
const AccountPage = () => {
    return (
        <div className='account'>
            <AccountNavbar />
            <Outlet />
        </div>
    );
};

export default AccountPage;