import React from 'react';
import { Link } from 'react-router-dom';

const  ExperienceBlock = ({title, descr, buttons, hero}) => {
    const btns = buttons.map(btn=><Link className="about-card__button experience-block__button" key={btn.buttonText} to={btn.to}>{btn.buttonText}</Link>)
    return (
        <div className='sub-about__block experience-block'>
            <div className='experience-block__img-cont'>
            <img src={hero} alt='experience hero' />
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

export default ExperienceBlock;