import React, { useEffect, useContext } from 'react';
import Card from '../../components/about/Card';
import { Context } from '../..';
import { fetchPage } from '../../utils/staticPages/aboutPage';
import { Spinner } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { isContainBtns } from '../../utils/check/isContainBtns';

const About = observer(() => {
    const { aboutPage } = useContext(Context);

    let title = aboutPage.pageTitle.length && aboutPage.pageTitle[0];
    const text = aboutPage.pageText.length && aboutPage.pageText[0];

    useEffect(()=>{
        fetchPage(aboutPage);
    },[])
   
    const cards = aboutPage.pageCards.slice().sort((a,b)=>a.id-b.id).map(card=>isContainBtns(aboutPage, card.button_id) && <Card key={card.id} {...card} />);

    if (aboutPage.loading) {
        return( <div className="spinner">
            <Spinner animation="border" />
        </div>)
    }
    return (
        <div className='about'>
            <div className='about__container'>
                <h2 className='about__title'>{title}</h2>
                <h4 className='about__descr'>{text}</h4>
                <ul className='about__cards'>
                    {cards}
                </ul>
            </div>
        </div>
    );
});

export default About;