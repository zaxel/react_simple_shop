import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ADMIN_APP_ROUTE, ADMIN_ABOUT_ROUTE, ADMIN_HELP_ROUTE, ABOUT_BUTTONS_ROUTE, ABOUT_BLOCKS_ROUTE,
        ABOUT_LEFT_CARD_ROUTE, ABOUT_MIDDLE_CARD_ROUTE, ABOUT_RIGHT_CARD_ROUTE, ADMIN_HELP_FAQ_ROUTE,
        ADMIN_HELP_CAT_ROUTE } from '../../../utils/consts/routes';


const PagesPanelNavbar = () => {
    const routes = [
        {to: ADMIN_APP_ROUTE, title: "app page"}, 
        {to: ADMIN_ABOUT_ROUTE, title: "about page"}, 
        {to: ABOUT_BUTTONS_ROUTE, title: "buttons"},
        {to: ABOUT_BLOCKS_ROUTE, title: "blocks"},
        {to: ABOUT_LEFT_CARD_ROUTE, title: "left card"},
        {to: ABOUT_MIDDLE_CARD_ROUTE, title: "middle card"},
        {to: ABOUT_RIGHT_CARD_ROUTE, title: "right card"},
        {to: ADMIN_HELP_ROUTE, title: "help page"},
        {to: ADMIN_HELP_FAQ_ROUTE, title: "FAQ"},
        {to: ADMIN_HELP_CAT_ROUTE, title: "categories"},

    ];
    const [active, setActive] = useState(false);

    useEffect(()=>{
        setActive(()=>ADMIN_APP_ROUTE);
    }, [])

    return (
        <nav className='pages__navbar'>
            <ul>
                {routes.map((item) => (
                    <li key={item.to} className="pages__nav-item">
                        <Link className={`pages__nav-link ${active === item.to && 'active'}`} onClick={setActive.bind(this, item.to)} to={item.to}>{item.title}</Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default PagesPanelNavbar;