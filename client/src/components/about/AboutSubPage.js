import React from 'react';
import { Link } from 'react-router-dom';

const AboutSubPage = ({children, title, descr, to}) => {
    return (
        <>
            <h2 className='sub-about__title'>{title}</h2>
            <div className='sub-about__descr'>
                <p>{descr}</p>
            </div>
            {children}
            <Link className="about-card__button" to={to}>more about us</Link>
        </>

    );
};

export default AboutSubPage;