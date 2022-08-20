import React from 'react';
import { Link } from 'react-router-dom';

const  AboutBlock = ({title, descr, buttons, hero, heroLarge}) => {
    const btns = buttons.map(btn=><Link className="about-card__button experience-block__button" key={btn.buttonText} to={btn.to}>{btn.buttonText}</Link>)
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
                <div className='experience-block__descr'>{descr}</div>
                <div className='experience-block__buttons'>{btns}</div>
            </div>
        </div>
    );
};

export default AboutBlock;