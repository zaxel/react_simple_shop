import React from 'react';
import { Link } from 'react-router-dom';
import { ABOUT_ROUTE } from '../../utils/consts/routes';
import arrow_right from "../../assets/icons/arrow-right.svg"
import contact_banner from "../../assets/help/contact_us.avif"

const Footer = () => {
    return (
        <div className='help__bottom-cont'>
                    <div className='popular-cont'>
                        <h3>popular faqs</h3>
                        <ul className='popular-cont__cards'>
                            <li>
                                <Link to={ABOUT_ROUTE}>
                                    <p>International deliveries</p>
                                    <div className='popular-cont__arrow-right'>
                                        <img src={arrow_right} alt='arrow right button'></img>
                                    </div>
                                </Link>
                            </li>
                            <li>
                                <Link to={ABOUT_ROUTE}>
                                    <p>International deliveries</p>
                                    <div className='popular-cont__arrow-right'>
                                        <img src={arrow_right} alt='arrow right button'></img>
                                    </div>
                                </Link>
                            </li>
                            <li>
                                <Link to={ABOUT_ROUTE}>
                                    <p>International deliveries</p>
                                    <div className='popular-cont__arrow-right'>
                                        <img src={arrow_right} alt='arrow right button'></img>
                                    </div>
                                </Link>
                            </li>
                            <li>
                                <Link to={ABOUT_ROUTE}>
                                    <p>International deliveries</p>
                                    <div className='popular-cont__arrow-right'>
                                        <img src={arrow_right} alt='arrow right button'></img>
                                    </div>
                                </Link>
                            </li>
                        </ul>
                    </div>


                    <div className='help__contact'>
                        <h3>NEED TO GET IN TOUCH?</h3>
                        <div className='help__contact-cont'>
                            <div className='contact-cont__banner'>
                                <img src={contact_banner} alt='contact us hero' />
                            </div>
                            <div className='contact-cont__button-wrapper'>
                                <Link to={ABOUT_ROUTE}>contact us now</Link>
                            </div>
                        </div>
                    </div>
                </div>
    );
};

export default Footer;