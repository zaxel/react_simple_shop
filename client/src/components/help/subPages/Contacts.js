import React from 'react';
import { Link } from 'react-router-dom';
import contact_banner from '../../../assets/help/contact_us.avif';
import { ABOUT_ROUTE } from '../../../utils/consts/routes';

const Contacts = () => {
    return (
        <div className='help-aside__contact'>
        
                        <div className='help__contact-cont'>
                            <div className='contact-cont__banner'>
                                <img src={contact_banner} alt='contact us hero' />
                            </div>
                            <h3 className='aside-h3'>NEED TO GET IN TOUCH?</h3>

                            <div className='contact-cont__button-wrapper'>
                                <Link to={ABOUT_ROUTE}>contact us now</Link>
                            </div>
                        </div>
                    </div>
        
    );
};

export default Contacts;