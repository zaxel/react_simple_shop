import React from 'react';

const ProtectedCard = ({title, hero, pathname, app_button, app_button_dark }) => {
    return (
        <a href={pathname} target="_blank" className='protected__cards prot-card'>
            <div className='prot-card__image-cont'>
                <img src={hero} alt={'store application hero'} />
            </div>
            <h3 className='prot-card__title'>{title}</h3>
            <div className='prot-card__button-cont'>
                <img className='prot-card__img' src={app_button} alt='app_button'/>
                <img className='prot-card__img-dark' src={app_button_dark} alt='app_button'/>
            </div>
        </a>
    );
};

export default ProtectedCard;