import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../..';
import { observer } from 'mobx-react-lite';
import { isContainBtns } from '../../utils/check/isContainBtns';
import { blockImgsLinks } from '../../utils/dataFormat/blockImgsLinks';
import { BASE_ROUTE } from '../../utils/consts/routes';

const AboutBlock = observer(({ id, title, text, button_id, hero}) => {
    const { aboutPage } = useContext(Context);
    const btns = isContainBtns(aboutPage, button_id) && button_id.map(btn => <Link className="about-card__button experience-block__button" key={aboutPage.buttons[btn].id} to={BASE_ROUTE+aboutPage.buttons[btn].link}>{aboutPage.buttons[btn].text}</Link>)

    return (
        <div className='sub-about__block experience-block'>
            <div className='experience-block__img-cont'>
                <img className='experience-block__img' src={process.env.REACT_APP_API_URL + blockImgsLinks(hero).hero} alt='about hero' />
                {blockImgsLinks(hero).smallHero && <img className='experience-block__img-small' src={process.env.REACT_APP_API_URL + blockImgsLinks(hero).smallHero} alt='about hero large' />}
            </div>
            <div className='experience-block__descr-cont'>
                <h3 className='experience-block__title'>
                    {title}
                </h3>
                <div className='experience-block__descr' dangerouslySetInnerHTML={{ __html: text }}></div>
                <div className='experience-block__buttons'>
                    {btns}
                </div>
            </div>
        </div>
    );
});

export default AboutBlock;