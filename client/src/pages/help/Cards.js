import React from 'react';
import Card from './Card';

const Cards = ({helpCategories}) => {
    const cards = helpCategories.map(card => <Card key={card.id} {...card} /> )
    return (
        <div className='help__faq-cont faq-cont'>
            <h2 className='faq-cont__title'>FAQ TOPICS</h2>
            <div className='faq-card__container'>
                {cards}
            </div>
        </div>
    );
};

export default Cards;