import { observer } from "mobx-react-lite";
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../..';
import { SHOP_ROUTE, REGISTRATION_ROUTE, ADMIN_ROUTE, ABOUT_ROUTE, HELP_ROUTE, PROTECTED_ROUTE } from '../../utils/consts/routes';
import ShoppingCartIcon from "./ShoppingCartIcon";
import WishListIcon from "./WishListIcon";
import NotificationIcon from "./NotificationIcon";
import ProfileIcon from "./ProfileIcon";
import NavSearchBar from "./NavSearchBar";

const Header = observer(() => {
    const { cart, user, device, history } = useContext(Context);
    const navigate = useNavigate();

    const resetPageOptions = () => {
        device.setSearchKey("");
        device.setActivePage(1);
        device.setBrandActive(null);
        device.setTypeActive(null);
    }

    return (
        <header className="navbar navbar-dark bg-dark navbar-expand-lg z-10">
            <div className="container-fluid flex justify-between items-center flex-wrap gap-3">
                <Link onClick={resetPageOptions} className="navbar-brand" to={SHOP_ROUTE}>Arazone</Link>
                <nav>
                    <ul className="flex-row navbar-nav mb-lg-0 gap-2">
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
                </nav>

                <ul className="navbar-nav navbar-user-data-cont flex-row justify-center items-center gap-8 xl:order-3">
                    <li className="nav-item">
                        <ShoppingCartIcon history={history} isAuth={user.isAuth} itemsCount={cart.itemsCount} />
                    </li>
                    <li className="nav-item">
                        <WishListIcon history={history} user={user} />
                    </li>
                    <li className="nav-item">
                        <NotificationIcon history={history} isAuth={user.isAuth} />
                    </li>
                    {user.isAuth && <li className="nav-item">
                        <ProfileIcon />
                    </li>}

                    {!user.isAuth && <li className="nav-item">
                        <button onClick={() => navigate(REGISTRATION_ROUTE)} className='btn btn-outline-secondary'>Sigh In</button>
                    </li>}
                    {user.isSuperUser && <li className="nav-item">
                        <button onClick={() => navigate(ADMIN_ROUTE)} className='btn btn-outline-secondary'>Admin panel</button>
                    </li>}
                </ul>
                {(history.lastPath === "/" || history.lastPath.startsWith("/device")) && <NavSearchBar />}

            </div>
        </header>
    );
});

export default Header;