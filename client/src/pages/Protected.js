import React from 'react';
import ProtectedCard from '../components/protected/ProtectedCard';
import { protectedData, cards } from '../utils/consts/protectedPageData';

const Protected = () => {
    const {title, descr} = protectedData;
    const protectedCards = cards.map(card=><ProtectedCard {...card} key={card.title}/>);

    return (
        <div className='protected'>
            <div className='protected__container'>
                <h2 className='protected__title'>{title}</h2>
                <div className='protected__descr'>{descr}</div>
                <div className='protected__cards'>{protectedCards}</div>
            </div>
        </div>
    );
};

export default Protected;