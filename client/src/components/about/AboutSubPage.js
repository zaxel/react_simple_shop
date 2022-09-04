import React from 'react';
import { Link } from 'react-router-dom';

const AboutSubPage = ({children, button_id, card_text, id, infoPageId, info_about_blocks, title}) => {
    return (
        <>
            <h2 className='sub-about__title'>{title}</h2>
            <div className='sub-about__descr'>
                <p>{card_text}</p>
            </div>
            {children}
            <Link className="about-card__button" to={'/'}>more about us</Link>
        </>

    );
};

export default AboutSubPage;