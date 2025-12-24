import { observer } from "mobx-react-lite";
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '..';
import {
    SHOP_ROUTE, REGISTRATION_ROUTE, ADMIN_ROUTE, ABOUT_ROUTE, HELP_ROUTE, LOGIN_ROUTE, 
    ACCOUNT_ROUTE, PROTECTED_ROUTE, PROFILE_ROUTE
} from '../utils/consts/routes';
import { logoutOnClient, logoutOnServer } from "../utils/logout";
import ShoppingCartIcon from "./cart/ShoppingCartIcon";

const NavBar = observer(() => {
    const { cart, user, device, history } = useContext(Context);
    const navigate = useNavigate();

    const onLogoutPressed = () => {
        logoutOnServer(cart); 
        logoutOnClient(cart, user); 
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
                        <Link className="nav-link" to={PROTECTED_ROUTE}>Our Apps</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={HELP_ROUTE}>Help</Link>
                    </li>
                </ul>
                    <ul className="navbar-nav navbar-user-data-cont flex-row justify-center items-center gap-2 md:gap-10">
                        {user.isSuperUser && <li className="nav-item">
                            <button onClick={() => navigate(ADMIN_ROUTE)} className='btn btn-outline-secondary'>Admin panel</button>
                        </li>}
                        <li className="nav-item">
                           <ShoppingCartIcon history={history} isAuth={user.isAuth} itemsCount={cart.itemsCount}/>
                        </li>
                        <li className="nav-item">
                            <button onClick={() => navigate(user.isAuth ? ACCOUNT_ROUTE : LOGIN_ROUTE)} className='btn btn-outline-secondary'>{user.isAuth ? `User ${user.user.id}` : 'Login'}</button>
                        </li>
                        <li className="nav-item">
                            <button onClick={() => navigate(user.isAuth ? PROFILE_ROUTE : LOGIN_ROUTE)} className='btn btn-outline-secondary'>{user.isAuth ? `User ${"Z"}` : 'Login'}</button>
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