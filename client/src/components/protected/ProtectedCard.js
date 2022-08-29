import React from 'react';

const ProtectedCard = ({title, hero, link, app_button_img, app_button_dark_img }) => {
    return (
        <a href={link} target="_blank" className='protected__cards prot-card'>
            <div className='prot-card__image-cont'>
                <img src = { process.env.REACT_APP_API_URL + hero } alt={'store application hero'} />
            </div>
            <h3 className='prot-card__title'>{title}</h3>
            <div className='prot-card__button-cont'>
                <img className='prot-card__img' src={process.env.REACT_APP_API_URL + app_button_img} alt='app_button'/>
                <img className='prot-card__img-dark' src={process.env.REACT_APP_API_URL + app_button_dark_img} alt='app_button'/>
            </div>
        </a>
    );
};

export default ProtectedCard;