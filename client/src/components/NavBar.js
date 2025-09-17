import { observer } from "mobx-react-lite";
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '..';
import {
    SHOP_ROUTE, REGISTRATION_ROUTE, BASKET_ROUTE,
    ADMIN_ROUTE, ABOUT_ROUTE, HELP_ROUTE, LOGIN_ROUTE, ACCOUNT_ROUTE,
    PROTECTED_ROUTE
} from '../utils/consts/routes';
import { logoutOnClient, logoutOnServer } from "../utils/logout";

const NavBar = observer(() => {
    const { cart, user, device } = useContext(Context);
    const navigate = useNavigate();

    const onLogoutPressed = () => {
        logoutOnClient(cart, user);
        logoutOnServer();
        navigate(LOGIN_ROUTE);
    }

    const resetPageOptions = () => {
        device.setSearchKey("");
        device.setActivePage(1);
        device.setBrandActive(null);
        device.setTypeActive(null);
    }

    return (
        <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
            <div className="container-fluid">
                <Link onClick={resetPageOptions} className="navbar-brand" to={SHOP_ROUTE}>Arazone</Link>
                <ul className="flex-row navbar-nav me-auto mb-lg-0">
                    <li className="nav-item">
                        <Link className="nav-link" to={SHOP_ROUTE}>Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={ABOUT_ROUTE}>About</Link>
                    </li>
                    <li onClick={resetPageOptions} className="nav-item">
                        <Link className="nav-link" to={SHOP_ROUTE}>Shop</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={PROTECTED_ROUTE}>Protected</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={HELP_ROUTE}>Help</Link>
                    </li>
                </ul>
                    <ul className="navbar-nav navbar-user-data-cont flex-row">
                        {user.isSuperUser && <li className="nav-item">
                            <button onClick={() => navigate(ADMIN_ROUTE)} className='btn btn-outline-secondary'>Admin panel</button>
                        </li>}
                        <li className="nav-item">
                            <button onClick={() => navigate(BASKET_ROUTE)} className='btn btn-outline-secondary'>{cart.itemsCount} Basket</button>
                        </li>
                        <li className="nav-item">
                            <button onClick={() => navigate(user.isAuth ? ACCOUNT_ROUTE : LOGIN_ROUTE)} className='btn btn-outline-secondary'>{user.isAuth ? `User ${user.user.id}` : 'Login'}</button>
                        </li>
                        <li className="nav-item">
                            <button onClick={user.isAuth ? onLogoutPressed : () => navigate(REGISTRATION_ROUTE)} className='btn btn-outline-secondary'>{user.isAuth ? 'Logout' :  'Sigh up'}</button>
                        </li>
                    </ul> 

            </div>
        </nav>
    );
});

export default NavBar;