import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../..';
import { ABOUT_CARD1_ROUTE, ABOUT_CARD2_ROUTE, ABOUT_CARD3_ROUTE } from '../../utils/consts/routes';
import { observer } from 'mobx-react-lite';

const  Card = observer(({hero, title, card_prev_text, button_id, to, id}) => {
    const { aboutPage } = useContext(Context);
    const aboutCardsRoutes = {
        1: ABOUT_CARD1_ROUTE,
        2: ABOUT_CARD2_ROUTE,
        3: ABOUT_CARD3_ROUTE,
    }
    return (
        <li className='about__card about-card'>
            <div className='about-card__img-cont'>
                <img src={process.env.REACT_APP_API_URL + hero} alt='about hero' />
            </div>
            <h3 className='about-card__title'>{title}</h3>
            <h4 className='about-card__descr'>{card_prev_text}</h4>
            <Link className="about-card__button" to={aboutCardsRoutes[id]}>{aboutPage.buttons[button_id[0]].text}</Link>
        </li>
    );
});

export default Card;