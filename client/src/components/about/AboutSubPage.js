import React, {useContext} from 'react';
import { Context } from '../..';
import { Link } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';

const AboutSubPage = observer(({children, button_id, card_text, id, infoPageId, info_about_blocks, title}) => {
    const { aboutPage } = useContext(Context);
    const btnText = aboutPage.buttons[button_id?.[1]]?.text;
    const btnLink = aboutPage.buttons[button_id?.[1]]?.link;

    if (aboutPage.loading) {
        return (
            <div className="spinner">
                <Spinner animation="border" />
            </div>
        )
    }
    return (
        <>
            <h2 className='sub-about__title'>{title}</h2>
            <div className='sub-about__descr'>
                <p>{card_text}</p>
            </div>
            {children}
            {btnLink && <Link className="about-card__button" to={btnLink}>{btnText}</Link>}
        </>

    );
});

export default AboutSubPage;