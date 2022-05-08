import React from 'react';
import { Outlet } from 'react-router-dom';
import AccountNavbar from '../components/userProfileComponents/AccountNavbar';
import UserAccountRouter from '../components/userProfileComponents/UserAccountRouter';
const AccountPage = () => {
    return (
        <div className='account'>
            <div className='account__container'>
                <AccountNavbar />
                <Outlet />
            </div>
        </div>
    );
};

export default AccountPage;