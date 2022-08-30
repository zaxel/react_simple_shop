import React from 'react';

const Card = ({id, link, title, hero, app_button_dark_img, app_button_img}) => {
    return (
        <div className='admin-app__card app-card'>
            <h2>edit cards id:{id}: </h2>
            <div className='app-card__img'>
                <img src={process.env.REACT_APP_API_URL + hero} alt='hero' />
            </div>
            <div className='app-card__title'>
                <p> {title}</p>
            </div>
            <div className='app-card__buttons'>
                <div className='app-card__button-img'>
                    <img src={process.env.REACT_APP_API_URL + app_button_img} alt='button' />
                </div>
                <div className='app-card__button-img'>
                    <img src={process.env.REACT_APP_API_URL + app_button_dark_img} alt='button hover' />
                </div>
            </div>
        </div>
    )
};

export default Card;