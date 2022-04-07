import { observer } from "mobx-react-lite";
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '..';
import {
    SHOP_ROUTE, ERROR_ROUTE, REGISTRATION_ROUTE, BASKET_ROUTE,
    ADMIN_ROUTE, ABOUT_ROUTE, CONTACT_ROUTE, LOGIN_ROUTE, ACCOUNT_ROUTE,
    PROTECTED_ROUTE
} from '../utils/consts';

const NavBar = observer(() => {
    const { cart, user } = useContext(Context);
    const navigate = useNavigate();

    const logout = () => {
        user.setUser({});
        user.setIsAuth(false);
        user.setIsSuperUser(false);

        cart.setItemsCount(0);
        cart.setCartDevices({});
    }
    return (
        <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Arazone</Link>
                <ul className="flex-row navbar-nav me-auto mb-lg-0">
                    <li className="nav-item">
                        <Link className="nav-link" to={SHOP_ROUTE}>Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={ABOUT_ROUTE}>About</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={SHOP_ROUTE}>Shop</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={PROTECTED_ROUTE}>Protected</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={CONTACT_ROUTE}>Contacts</Link>
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
                            <button onClick={user.isAuth ? logout : () => navigate(REGISTRATION_ROUTE)} className='btn btn-outline-secondary'>{user.isAuth ? 'Logout' :  'Sigh up'}</button>
                        </li>
                    </ul> 

            </div>
        </nav>
    );
});

export default NavBar;