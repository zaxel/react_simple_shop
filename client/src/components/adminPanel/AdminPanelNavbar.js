import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ADMIN_USER_ROUTE, ADMIN_ORDERS_ROUTE, ADMIN_DEVICES_ROUTE, ADMIN_TYPES_ROUTE, ADMIN_BRANDS_ROUTE, ADMIN_PAGES_ROUTE } from '../../utils/consts/routes';

const AdminPanelNavbar = () => {
    const routes = [
        {to: ADMIN_USER_ROUTE, title: "users"}, 
        {to: ADMIN_ORDERS_ROUTE, title: "orders"}, 
        {to: ADMIN_DEVICES_ROUTE, title: "devices"},
        {to: ADMIN_TYPES_ROUTE, title: "devices types"},
        {to: ADMIN_BRANDS_ROUTE, title: "devices brands"},
        {to: ADMIN_PAGES_ROUTE, title: "static pages"},
    ];
    const [active, setActive] = useState(false);

    useEffect(()=>{
        setActive(()=>ADMIN_USER_ROUTE);
    }, [])

    return (
        <nav className='account__navbar'>
            <ul>
                {routes.map((item) => (
                    <li key={item.to} className="account__nav-item">
                        <Link className={`account__nav-link ${active === item.to && 'active'}`} onClick={setActive.bind(this, item.to)} to={item.to}>{item.title}</Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default AdminPanelNavbar;