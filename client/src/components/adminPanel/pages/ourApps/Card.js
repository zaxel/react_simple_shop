import React from 'react';
import AdminTextInput from '../../commonComponents/AdminTextInput';
import AdminImage from '../../commonComponents/AdminImage';
import { updateAppCardImg } from '../../../../http/pageAPI';
import { setAppCardData, changeAppCardImg } from '../../../../utils/staticPages/appPage';

const Card = ({id, link, title, hero, app_button_dark_img, app_button_img}) => {

    const setCardTitleCarried = setAppCardData.bind(this, id, 'title')

    return (
        <div className='admin-app__card app-card'>
            <h2>edit card with id {id}: </h2>
            <div className='app-card__img'>
                <AdminImage id={id} inputTitle={''} imgDbCollName={'hero'} inputData={hero} cb={changeAppCardImg} alt={'card hero'}/>
                {/* <img src={process.env.REACT_APP_API_URL + hero} alt='hero' /> */}
            </div>
            <div className='app-card__title'>
                <AdminTextInput inputTitle={''} inputText={title} cb={setCardTitleCarried}/>
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