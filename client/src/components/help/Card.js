import React from 'react';
import { Link } from 'react-router-dom';
import { ABOUT_ROUTE } from '../../utils/consts/routes';

const Card = ({icon, link, title}) => {
    return (
        <div className='faq-cont__card faq-card'>
                            <div className='faq-card__title'>
                                <div className='faq-card__icon'>
                                    <img src={icon} alt="faq icon" />
                                </div>
                                <Link to={link}>{title}</Link>
                            </div>
                            <ul className='faq-card__links'>
                                <li><Link to={ABOUT_ROUTE}>International deliveries</Link></li>
                                <li><Link to={ABOUT_ROUTE}>International deliveries</Link></li>
                                <li><Link to={ABOUT_ROUTE}>International deliveries</Link></li>
                            </ul>
                            <div className='faq-card__all'>
                                <Link to={link}>View All</Link>
                            </div>
                        </div>
    );
};

export default Card;