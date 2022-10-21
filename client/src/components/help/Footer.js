﻿import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ABOUT_ROUTE } from '../../utils/consts/routes';
import contact_banner from "../../assets/help/contact_us.avif"
import FooterCard from './FooterCard';
import { Context } from '../..';
import { observer } from 'mobx-react-lite';

const Footer = observer(() => {
    const { helpPage } = useContext(Context);
// const Footer = ({popularFaqs, helpCategories}) => {
    // const cards = popularFaqs.map(el=><FooterCard key={helpCategories[el.category].faqs[el.faq_id].question} {...helpCategories[el.category].faqs[el.faq_id]}/>)
    return (
        <div className='help__bottom-cont'>
                    <div className='popular-cont'>
                        <h3>popular faqs</h3>
                        <ul className='popular-cont__cards'>
                            {'cards'}
                        </ul>
                    </div>
                    <div className='help__contact'>
                        <h3>{helpPage.contactTitle}</h3>
                        <div className='help__contact-cont'>
                            <div className='contact-cont__banner'> 
                                <img src={process.env.REACT_APP_API_URL + helpPage.contactHero} alt='contact us hero' />
                            </div>
                            <div className='contact-cont__button-wrapper'>
                                <Link to={ABOUT_ROUTE}>contact us now</Link>
                            </div>
                        </div>
                    </div>
                </div>
    );
});

export default Footer;