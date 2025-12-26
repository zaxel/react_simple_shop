import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useWindowSize from '../hooks/useWindowSize';
import { registration, login } from '../http/userAPI';
import { REGISTRATION_ROUTE, LOGIN_ROUTE, SHOP_ROUTE, BASE_ROUTE } from '../utils/consts/routes';
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import { checkAuth } from '../utils/checkAuth';
import { isActivated } from '../utils/check/isActivated';
import { setUserData } from '../utils/setUserData';
import setWishList from '../utils/setWishList';

const Auth = observer(() => {
    const { user, history } = useContext(Context);
    const params = useLocation();
    const fromPath = history.lastPath + BASE_ROUTE;

    let isLogin = params.pathname === LOGIN_ROUTE;
    const authForm = useRef(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const auth = async (e) => {
        try {
            if (isLogin) {
                e.preventDefault();
                await login(email, password);
            } else {
                e.preventDefault();
                await registration(email, password);
            }
            const authUser = await checkAuth(user);
            await setUserData(user, authUser);
            await setWishList(user, history); 
            isActivated(user); 
            navigate(BASE_ROUTE+(fromPath==="/login" ? "/" : fromPath));
        } catch (e) {
            console.log(e)
            alert(e.message);
        }
    }
    return (
        <div ref={authForm} className='auth h-[98dvh]'>
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