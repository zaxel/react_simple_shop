import { observer } from "mobx-react-lite";
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '..';
import {
    SHOP_ROUTE, ERROR_ROUTE, REGISTRATION_ROUTE, BASKET_ROUTE,
    ADMIN_ROUTE, ABOUT_ROUTE, CONTACT_ROUTE, LOGIN_ROUTE, ACCOUNT_ROUTE
} from '../utils/consts';

const NavBar = observer(() => {
    const { user } = useContext(Context);
    const navigate = useNavigate();

    const logout = () => {
        user.setUser({});
        user.setIsAuth(false);
        user.setIsSuperUser(false);
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
                        <Link className="nav-link" to={CONTACT_ROUTE}>Contacts</Link>
                    </li>
                </ul>
                {user.isAuth ?
                    <ul className="navbar-nav navbar-user-data-cont flex-row">
                        {user.isSuperUser && <li className="nav-item">
                            <button onClick={() => navigate(ADMIN_ROUTE)} className='btn btn-outline-secondary'>Admin panel</button>
                        </li>}
                        <li className="nav-item">
                            <button onClick={() => navigate(ACCOUNT_ROUTE)} className='btn btn-outline-secondary'>{`User ${user.user.id}`}</button>
                        </li>
                        <li className="nav-item">
                            <button onClick={() => navigate(BASKET_ROUTE)} className='btn btn-outline-secondary'>Basket</button>
                        </li>
                        <li className="nav-item">
                            <button onClick={logout} className='btn btn-outline-secondary'>Logout</button>
                        </li>
                    </ul> :
                    <ul className="navbar-nav navbar-user-data-cont flex-row">
                        
                        <li className="nav-item">
                            <button onClick={() => navigate(BASKET_ROUTE)} className='btn btn-outline-secondary'>Basket</button>
                        </li>

                        <li className="nav-item">
                            <button onClick={() => navigate(LOGIN_ROUTE)} className='btn btn-outline-secondary'>Login</button>
                        </li>
                        <li className="nav-item">
                            <button onClick={() => navigate(REGISTRATION_ROUTE)} className='btn btn-outline-secondary'>Sigh up</button>
                        </li>
                    </ul>
                }

            </div>
        </nav>
    );
});

export default NavBar;