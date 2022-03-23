import React, { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useWindowSize from '../hooks/useWindowSize';
import { REGISTRATION_ROUTE, LOGIN_ROUTE, NAVBAR_HEIGHT } from '../utils/consts';

const Auth = () => {
    const params = useLocation();
    let isLogin = params.pathname === LOGIN_ROUTE;
    const authForm = useRef(null);
    const [width, height] = useWindowSize();
    useEffect(()=>{
        authForm.current.style.height = height - NAVBAR_HEIGHT +'px';
    }, [width, height])
    return (
        <div ref={authForm} className='auth'>
            {console.log('render')}
            <form className='auth__form'>
                <h3 className='auth__title'>
                    {isLogin ? 'Login' : 'Sign Up'}
                </h3>
                <input type='email' placeholder='your email' className='auth__input-email'></input>
                <input type='password' placeholder='your password' className='auth__input-pass'></input>
                {
                    isLogin ? 
                    <div className='auth__submit-cont'>
                        <p className='auth__descr'>No account? <Link className="nav-link" to={REGISTRATION_ROUTE}>Sign Up</Link></p>
                        <button className='btn btn-outline-light auth__button'>Login</button>
                    </div> : 
                    <div className='auth__submit-cont'>
                        <p className='auth__descr'>Have an account? <Link className="nav-link" to={LOGIN_ROUTE}>Login</Link></p>
                        <button className='btn btn-outline-light auth__button'>Sign Up</button>
                    </div>
                }
                
            </form>
        </div>
    );
};

export default Auth;