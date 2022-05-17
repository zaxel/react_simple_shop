import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ADMIN_USER_ROUTE, ADMIN_ORDERS_ROUTE, ADMIN_TYPES_ROUTE, ADMIN_BRANDS_ROUTE } from '../../utils/consts';
import AdminPanelRouter from './AdminPanelRouter';

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
                    <Link className="account__nav-link" to={ADMIN_TYPES_ROUTE}>devices types</Link>
                </li>
                <li className="account__nav-item">
                    <Link className="account__nav-link" to={ADMIN_BRANDS_ROUTE}>devices brands</Link>
                </li>
                
            </ul>
        </nav>
    );
};

export default AdminPanelNavbar;