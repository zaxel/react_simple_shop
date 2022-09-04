import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../..';

const  AboutBlock = ({id, title, text, button_id, hero, heroLarge}) => {
    const {aboutPage} = useContext(Context);
    const btns = button_id?.map(btn=><Link className="about-card__button experience-block__button" key={aboutPage.buttons[btn].id} to={aboutPage.buttons[btn].link}>{aboutPage.buttons[btn].text}</Link>)
    return (
        <div className='sub-about__block experience-block'>
            <div className='experience-block__img-cont'>
                <img className='experience-block__img' src={hero} alt='about hero' />
                {heroLarge && <img className='experience-block__img-large' src={heroLarge} alt='about hero large' />}
            </div>
            <div className='experience-block__descr-cont'>
                <h3 className='experience-block__title'>
                    {title}
                </h3>
                <div className='experience-block__descr'>{text}</div>
                <div className='experience-block__buttons'>{btns}</div>
            </div>
        </div>
    );
};

export default AboutBlock;