import React from 'react';
import { Link } from 'react-router-dom';
import { ADMIN_USER_ROUTE, ADMIN_ORDERS_ROUTE, ADMIN_DEVICES_ROUTE, ADMIN_TYPES_ROUTE, ADMIN_BRANDS_ROUTE, ADMIN_PAGES_ROUTE } from '../../utils/consts/routes';

const AdminPanelNavbar = () => {
    return (
        <nav className='account__navbar'>
            <ul>
                <li className="account__nav-item">
                    <Link className="account__nav-link" to={ADMIN_USER_ROUTE}>users</Link>
                </li>
                <li className="account__nav-item">
                    <Link className="account__nav-link" to={ADMIN_ORDERS_ROUTE}>orders</Link>
                </li>
                <li className="account__nav-item">
                    <Link className="account__nav-link" to={ADMIN_DEVICES_ROUTE}>devices</Link>
                </li>
                <li className="account__nav-item">
                    <Link className="account__nav-link" to={ADMIN_TYPES_ROUTE}>devices types</Link>
                </li>
                <li className="account__nav-item">
                    <Link className="account__nav-link" to={ADMIN_BRANDS_ROUTE}>devices brands</Link>
                </li>
                <li className="account__nav-item">
                    <Link className="account__nav-link" to={ADMIN_PAGES_ROUTE}>static pages</Link>
                </li>
                
            </ul>
        </nav>
    );
};

export default AdminPanelNavbar;