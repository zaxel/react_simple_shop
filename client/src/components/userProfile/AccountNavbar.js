import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ACCOUNT_INFO_ROUTE, ACCOUNT_DELIVERY_ROUTE, ACCOUNT_PAYMENT_ROUTE, ACCOUNT_ORDERS_ROUTE } from '../../utils/consts/routes';

const AccountNavbar = () => {
    const routes = [
        {to: ACCOUNT_INFO_ROUTE, title: "main"}, 
        {to: ACCOUNT_DELIVERY_ROUTE, title: "delivery"}, 
        {to: ACCOUNT_PAYMENT_ROUTE, title: "payments"},
        {to: ACCOUNT_ORDERS_ROUTE, title: "orders"},
    ];
    const [active, setActive] = useState(false);

    useEffect(()=>{
        setActive(()=>ACCOUNT_INFO_ROUTE);
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

export default AccountNavbar;