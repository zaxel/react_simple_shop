import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ABOUT_ROUTE } from '../../utils/consts/routes';
import FooterCard from './FooterCard';
import { Context } from '../..';
import { observer } from 'mobx-react-lite';

const Footer = observer(() => {
    const { helpPage } = useContext(Context);
    const [contactUsHeroSrc, setContactUsHeroSrc] = useState(null);
    let cards = [];
    useEffect(()=>{
        if(helpPage.contactHero)
            setContactUsHeroSrc(process.env.REACT_APP_API_URL + helpPage.contactHero)
    }, [helpPage.contactHero])

    if(helpPage.faqPopular.length)
        cards = helpPage.faqPopular.map(faq=><FooterCard key={faq.id} {...faq}/>)
    
        return (
        <div className='help__bottom-cont'>
                    <div className='popular-cont'>
                        <h3>popular faqs</h3>
                        <ul className='popular-cont__cards'>
                            {cards}
                        </ul>
                    </div>
                    <div className='help__contact'>
                        <h3>{helpPage.contactTitle}</h3>
                        <div className='help__contact-cont'>
                            <div className='contact-cont__banner'> 
                                <img src={contactUsHeroSrc} alt='contact us hero' />
                            </div>
                            <div className='contact-cont__button-wrapper'>
                                <Link to={ABOUT_ROUTE}>contact us now</Link>
                            </div>
                        </div>
                    </div>
                </div>
    );
});

export default Footer;