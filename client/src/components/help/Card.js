import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ icon, link, title, id, faqs, banner }) => {
    const questInCategory = 4;
    // const faqsList = faqs.filter(el => el.id < questInCategory).map(faq => <li key={faq.id}><Link to={faq.link}>{faq.question}</Link></li>);
    return (
        <div className='faq-cont__card faq-card'>
            <div className='faq-card__title'>
                <div className='faq-card__icon'>
                    <img src={process.env.REACT_APP_API_URL + icon} alt="faq icon" />
                </div>
                <Link to={link}>{title}</Link>
            </div>
            <ul className='faq-card__links'>
                {'faqsList'}
            </ul>
            <div className='faq-card__all'>
                <Link to={link}>View All</Link>
            </div>
        </div>
    );
};

export default Card;