import React from 'react';
import { Link } from 'react-router-dom';
import { ADMIN_APP_ROUTE, ADMIN_ABOUT_ROUTE, ADMIN_HELP_ROUTE } from '../../../utils/consts/routes';

const PagesPanelNavbar = () => {
    return (
        <nav className='pages__navbar'>
            <ul>
                <li className="pages__nav-item">
                    <Link className="pages__nav-link" to={ADMIN_ABOUT_ROUTE}>about</Link>
                </li>
                <li className="pages__nav-item">
                    <Link className="pages__nav-link" to={ADMIN_APP_ROUTE}>our app</Link>
                </li>
                <li className="pages__nav-item">
                    <Link className="pages__nav-link" to={ADMIN_HELP_ROUTE}>help</Link>
                </li>
                
                
            </ul>
        </nav>
    );
};

export default PagesPanelNavbar;