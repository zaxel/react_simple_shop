import React, {useContext} from 'react';
import { Context } from '../..';
import { Link } from 'react-router-dom';

const AboutSubPage = ({children, button_id, card_text, id, infoPageId, info_about_blocks, title}) => {
    const { aboutPage } = useContext(Context);
    const btnText = aboutPage.buttons[button_id?.[1]]?.text ?? 'button';
    const btnLink = aboutPage.buttons[button_id?.[1]]?.link ?? 'button';

    return (
        <>
            <h2 className='sub-about__title'>{title}</h2>
            <div className='sub-about__descr'>
                <p>{card_text}</p>
            </div>
            {children}
            <Link className="about-card__button" to={btnLink}>{btnText}</Link>
        </>

    );
};

export default AboutSubPage;