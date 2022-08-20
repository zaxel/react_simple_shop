import React from 'react';
import Card from '../../components/about/Card';
import { aboutMain } from '../../utils/consts/aboutPageData';


const About = () => {
    
    const cards = aboutMain.map(card=><Card key={card.title} {...card} />);
    return (
        <div className='about'>
            <div className='about__container'>
                <h2 className='about__title'>About ARAZONE.</h2>
                <h4 className='about__descr'>Everything you wanted to know about your fave fashion brand. And then some.</h4>
                <ul className='about__cards'>
                    {cards}
                </ul>
            </div>
        </div>
    );
};

export default About;