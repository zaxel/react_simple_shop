import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Context } from '../..';
import { HELP_FAQ_ROUTE, HELP_CAT_ROUTE } from '../../utils/consts/routes';

const Card = observer(({ id, link, title, icon, banner }) => {
    const { helpPage } = useContext(Context); 

    const faqsList = helpPage.starterQuestions
        .slice()
        .filter(el => el.infoHelpCategoryId === id)
        .sort((a, b) => a.order_id - b.order_id)
        .map(faq => <li key={faq.id}><Link to={HELP_FAQ_ROUTE}>{faq.question}</Link></li>);

    return (
        <div className='faq-cont__card faq-card'>
            <div className='faq-card__title'>
                <div className='faq-card__icon'>
                    <img src={process.env.REACT_APP_API_URL + icon} alt="faq icon" />
                </div>
                <Link to={HELP_CAT_ROUTE + link}>{title}</Link> 
            </div>
            <ul className='faq-card__links'>
                {!faqsList.length 
                    ? (<div className="spinner">
                            <Spinner animation="border" />
                        </div>)
                    : faqsList  
                }
            </ul>
            <div className='faq-card__all'>
                <Link to={HELP_CAT_ROUTE + link}>View All</Link> 
            </div>
        </div>
    );
});

export default Card;