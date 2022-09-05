import React, {useContext} from 'react';
import AdminTextInput from '../../commonComponents/AdminTextInput';
import AdminImage from '../../commonComponents/AdminImage';
import { Context } from '../../../..';
import { changeAboutCardData, changeAboutCardImg } from '../../../../utils/staticPages/aboutPage';
import { changeAboutBtnData } from '../../../../utils/staticPages/aboutPage';

const Card = ({ hero, title, card_prev_text, button_id, to, id }) => {
    const { aboutPage } = useContext(Context);
    const buttonText = aboutPage.buttons[button_id[0]].text;
    const buttonId = button_id[0];
    console.log(hero, title, card_prev_text, button_id, to, id)
    const changeCardTitleCarried = changeAboutCardData.bind(this, id, 'title')
    const changeCardTextCarried = changeAboutCardData.bind(this, id, 'card_prev_text')
    const changeBtnTextCarried = changeAboutBtnData.bind(this, buttonId, 'text')

    return (
        <div className='admin-app__card about-card'>
            <h2>edit card with id {id}: </h2>
            <div className='app-card__img'>
                <AdminImage id={id} inputTitle={''} imgDbCollName={'hero'} inputData={hero} alt={'card hero'} />
                {/* <AdminImage id={id} inputTitle={''} imgDbCollName={'hero'} inputData={hero} cb={changeAppCardImg} alt={'card hero'} /> */}
            </div>
            <div className='app-card__title'>
                {/* <AdminTextInput inputTitle={'title'} inputText={title} cb={setCardTitleCarried} /> */}
                <AdminTextInput inputTitle={'title'} inputText={title} cb={changeCardTitleCarried}/>
            </div>
            <div className='app-card__title'>
                {/* <AdminTextInput inputTitle={'text'} inputText={card_prev_text} cb={setCardLinkCarried} /> */}
                <AdminTextInput inputTitle={'text'} inputText={card_prev_text} cb={changeCardTextCarried}/>
            </div>
            <div className='about-card__buttons'>
                <div className='about-card__button-img'>
                    <AdminTextInput inputTitle={'button text'} inputText={buttonText} cb={changeBtnTextCarried}/>
                </div>
                
            </div>
        </div>
    )
};

export default Card;