import React from 'react';
import { Link } from 'react-router-dom';
import { ACCOUNT_INFO_ROUTE, ACCOUNT_DELIVERY_ROUTE, ACCOUNT_PAYMENT_ROUTE, ACCOUNT_ORDERS_ROUTE } from '../../utils/consts';

const AccountNavbar = () => {
    return (
        <nav className='account__navbar'>
            <ul>
                <li className="account__nav-item">
                    <Link className="account__nav-link" to={ACCOUNT_INFO_ROUTE}>main</Link>
                </li>
                <li className="account__nav-item">
                    <Link className="account__nav-link" to={ACCOUNT_DELIVERY_ROUTE}>delivery</Link>
                </li>
                <li className="account__nav-item">
                    <Link className="account__nav-link" to={ACCOUNT_PAYMENT_ROUTE}>payments</Link>
                </li>
                <li className="account__nav-item">
                    <Link className="account__nav-link" to={ACCOUNT_ORDERS_ROUTE}>orders</Link>
                </li>
                
            </ul>
        </nav>
    );
};

export default AccountNavbar;