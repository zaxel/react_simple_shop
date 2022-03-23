import { observer } from "mobx-react-lite"
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '..';
import { SHOP_ROUTE, ERROR_ROUTE } from '../utils/consts';

const NavBar = observer(() => {
    const {user} = useContext(Context);
    
    return (
        <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Arazone</Link>
                <ul className="flex-row navbar-nav me-auto mb-lg-0">
                    <li className="nav-item">
                        <Link className="nav-link" to={SHOP_ROUTE}>Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={SHOP_ROUTE}>About</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={SHOP_ROUTE}>Shop</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={ERROR_ROUTE}>Contacts</Link>
                    </li>
                </ul>
                {user.isAuth ?
                    <ul className="navbar-nav navbar-user-data-cont flex-row">
                        <li className="nav-item">
                            <button className='btn btn-outline-secondary'>Admin panel</button> 
                        </li>
                        <li className="nav-item">
                            <button className='btn btn-outline-secondary'>Basket</button> 
                        </li>
                        <li className="nav-item">
                            <button onClick={()=>user.setIsAuth(false)} className='btn btn-outline-secondary'>Exit</button> 
                        </li>
                    </ul>  :
                    <ul className="navbar-nav navbar-user-data-cont flex-row">
                        <li className="nav-item">
                            <button className='btn btn-outline-secondary'>Basket</button> 
                        </li>
                        <li className="nav-item">
                            <button onClick={()=>user.setIsAuth(true)} className='btn btn-outline-secondary'>Login</button> 
                        </li>
                        <li className="nav-item">
                            <button className='btn btn-outline-secondary'>Sigh up</button> 
                        </li>
                    </ul>
                }
                
            </div>
        </nav>
    );
});

export default NavBar;