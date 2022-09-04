import React, { useEffect, useContext } from 'react';
import Card from '../../components/about/Card';
import { aboutMain } from '../../utils/consts/aboutPageData';
import { Context } from '../..';
import { fetchPage } from '../../utils/staticPages/aboutPage';
import { Spinner } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';

const About = observer(() => {
    const { aboutPage } = useContext(Context);

    useEffect(()=>{
        fetchPage(aboutPage);
    },[])
    
    const cards = aboutPage.pageCards.slice().sort((a,b)=>a.id-b.id).map((card, i)=><Card key={card.id} {...card} />);

    if (aboutPage.loading) {
        return( <div className="spinner">
            <Spinner animation="border" />
        </div>)
    }
    return (
        <div className='about'>
            <div className='about__container'>
                <h2 className='about__title'>{aboutPage.pageTitle[0]}</h2>
                <h4 className='about__descr'>{aboutPage.pageText[0]}</h4>
                <ul className='about__cards'>
                    {cards}
                </ul>
            </div>
        </div>
    );
});

export default About;