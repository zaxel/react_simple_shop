import React, {useContext} from 'react';
import AdminTextInput from '../../commonComponents/AdminTextInput';
import AdminImage from '../../commonComponents/AdminImage';
import { Context } from '../../../..';
import { setAppCardData, changeAppCardImg } from '../../../../utils/staticPages/aboutPage';

const Card = ({ hero, title, card_prev_text, button_id, to, id }) => {
    const { aboutPage } = useContext(Context);

    console.log(hero, title, card_prev_text, button_id, to, id)
    // const setCardTitleCarried = setAppCardData.bind(this, id, 'title')
    // const setCardLinkCarried = setAppCardData.bind(this, id, 'link')

    return (
        <div className='admin-app__card about-card'>
            <h2>edit card with id {id}: </h2>
            <div className='app-card__img'>
                <AdminImage id={id} inputTitle={''} imgDbCollName={'hero'} inputData={hero} alt={'card hero'} />
                {/* <AdminImage id={id} inputTitle={''} imgDbCollName={'hero'} inputData={hero} cb={changeAppCardImg} alt={'card hero'} /> */}
            </div>
            <div className='app-card__title'>
                {/* <AdminTextInput inputTitle={'title'} inputText={title} cb={setCardTitleCarried} /> */}
                <AdminTextInput inputTitle={'title'} inputText={title} />
            </div>
            <div className='app-card__title'>
                {/* <AdminTextInput inputTitle={'text'} inputText={card_prev_text} cb={setCardLinkCarried} /> */}
                <AdminTextInput inputTitle={'text'} inputText={card_prev_text}/>
            </div>
            <div className='about-card__buttons'>
                <div className='about-card__button-img'>
                    <AdminTextInput inputTitle={'button text'} inputText={aboutPage.buttons[button_id[0]].text}/>
                </div>
                
            </div>
        </div>
    )
};

export default Card;