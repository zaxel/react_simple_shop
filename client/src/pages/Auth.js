import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useWindowSize from '../hooks/useWindowSize';
import { registration, login } from '../http/userAPI';
import { getCart } from '../http/cartAPI';
import { REGISTRATION_ROUTE, LOGIN_ROUTE, NAVBAR_HEIGHT, SHOP_ROUTE } from '../utils/consts';
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import { setUserIfAuth } from '../utils/setUserIfAuth';
import { fetchCartOnAuth, setCartId } from '../utils/fetchSetCart';
import { setLocalStoreCart } from '../utils/setLocalStoreCart';

const Auth = observer(() => {
    const { user, history, cart } = useContext(Context);
    const params = useLocation();
    const authFromPath = history.authFrom;

    let isLogin = params.pathname === LOGIN_ROUTE;
    const authForm = useRef(null);
    const [width, height] = useWindowSize();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    let from = { pathname: authFromPath || "/" }
    const navigate = useNavigate();

    useEffect(() => {
        authForm.current.style.height = height - NAVBAR_HEIGHT + 'px';
        return () => {
            history.setAuthFrom(SHOP_ROUTE);
        }
    }, [width, height])

    const auth = async (e) => {
        try {
            let data;
            if (isLogin) {
                e.preventDefault();
                data = await login(email, password);
            } else {
                e.preventDefault();
                data = await registration(email, password);
            }
            await setUserIfAuth(user);
            cart.setCart(JSON.parse(localStorage.getItem('cart'))|| []);
            await setCartId(cart);

            await fetchCartOnAuth(user, cart);

            
            setLocalStoreCart(cart);
            navigate(from);
        } catch (e) {
            console.log(e)
            alert(e.message);
        }

    }
    return (
        <div ref={authForm} className='auth'>
            <form className='auth__form'>
                <h3 className='auth__title'>
                    {isLogin ? 'Login' : 'Sign Up'}
                </h3>
                <input value={email} onChange={e => setEmail(e.target.value)} type='email' placeholder='your email' className='auth__input-email'></input>
                <input value={password} onChange={e => setPassword(e.target.value)} type='password' placeholder='your password' className='auth__input-pass'></input>
                {
                    isLogin ?
                        <div className='auth__submit-cont'>
                            <p className='auth__descr'>No account? <Link className="nav-link" to={REGISTRATION_ROUTE}>Sign Up</Link></p>
                            <button onClick={auth} className='btn btn-outline-light auth__button'>Login</button>
                        </div> :
                        <div className='auth__submit-cont'>
                            <p className='auth__descr'>Have an account? <Link className="nav-link" to={LOGIN_ROUTE}>Login</Link></p>
                            <button onClick={auth} className='btn btn-outline-light auth__button'>Sign Up</button>
                        </div>
                }

            </form>
        </div>
    );
});

export default Auth;