import React from 'react';
import { Link } from 'react-router-dom';

const  Card = ({hero, title, descr, buttonText, to}) => {
    return (
        <li className='about__card about-card'>
            <div className='about-card__img-cont'>
                <img src={hero} alt='about hero' />
            </div>
            <h3 className='about-card__title'>{title}</h3>
            <h4 className='about-card__descr'>{descr}</h4>
            <Link className="about-card__button" to={to}>{buttonText}</Link>
        </li>
    );
};

export default Card;