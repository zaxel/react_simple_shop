﻿import React from 'react';
import AdminTextInput from '../../commonComponents/AdminTextInput';
import AdminImage from '../../commonComponents/AdminImage';
import { setAppCardData, changeAppCardImg } from '../../../../utils/staticPages/appPage';

const Card = ({ id, link, title, hero, app_button_dark_img, app_button_img }) => {

    const setCardTitleCarried = setAppCardData.bind(this, id, 'title')
    const setCardLinkCarried = setAppCardData.bind(this, id, 'link')

    return (
        <div className='admin-app__card app-card'>
            <h2>edit card with id {id}: </h2>
            <div className='app-card__img'>
                <AdminImage id={id} inputTitle={''} imgDbCollName={'hero'} inputData={hero} cb={changeAppCardImg} alt={'card hero'} />
            </div>
            <div className='app-card__title'>
                <AdminTextInput inputTitle={'title'} inputText={title} cb={setCardTitleCarried} />
            </div>
            <div className='app-card__title'>
                <AdminTextInput inputTitle={'link'} inputText={link} cb={setCardLinkCarried} />
            </div>
            <div className='app-card__buttons'>
                <div className='app-card__button-img'>
                    <AdminImage id={id} inputTitle={''} imgDbCollName={'app_button_img'} inputData={app_button_img} cb={changeAppCardImg} alt={'button'} />
                </div>
                <div className='app-card__button-img'>
                    <AdminImage id={id} inputTitle={''} imgDbCollName={'app_button_dark_img'} inputData={app_button_dark_img} cb={changeAppCardImg} alt={'button hover'} />
                </div>
            </div>
        </div>
    )
};

export default Card;