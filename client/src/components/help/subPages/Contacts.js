import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../../..';
import { ABOUT_ROUTE } from '../../../utils/consts/routes';

const Contacts = observer(() => {
    const { helpPage } = useContext(Context);

    return (
        <div className='help-aside__contact'>
            <div className='help__contact-cont'>
                <div className='contact-cont__banner'> 
                    <img src={process.env.REACT_APP_API_URL + helpPage.contactHero} alt='contact us hero' />
                </div>
                <h3 className='aside-h3'>{helpPage.contactTitle}</h3>
                <div className='contact-cont__button-wrapper'>
                    <Link to={ABOUT_ROUTE}>contact us now</Link> 
                </div>
            </div>
        </div>
    );
});

export default Contacts;