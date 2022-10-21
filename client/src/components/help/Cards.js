import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Spinner } from 'react-bootstrap';
import { Context } from '../..';
import Card from './Card';

const Cards = observer(() => {
    const { helpPage } = useContext(Context);
    let cards = null;

    if(helpPage.categories.length){
        cards = helpPage.categories.map(card => {
            return <Card key={card.id} {...card} />
        })
    } 

    if (!cards) {
        return (<div className="spinner">
            <Spinner animation="border" />
        </div>)
    }
    return (
        <div className='help__faq-cont faq-cont'>
            <h2 className='faq-cont__title'>FAQ TOPICS</h2>
            <div className='faq-card__container'>
                {cards}
            </div>
        </div>
    );
});

export default Cards;