import React from 'react';
import Card from '../components/about/Card';
import hero1 from '../assets/about/about_main_1.jpg';
import hero2 from '../assets/about/about_main_2.jpg';
import hero3 from '../assets/about/about_main_3.jpg';
import { SHOP_ROUTE as to } from '../utils/consts/routes';


const About = () => {
    const aboutCardsData = [
        {hero: hero1, title: 'Who we are', descr: 'Your biggest fans, that\'s who', buttonText: 'read the arazone 101', to},
        {hero: hero2, title: 'The ARAZONE Brands', descr: 'Made by us, loved by you', buttonText: 'right this way', to},
        {hero: hero3, title: 'The ARAZONE experience', descr: 'Cos there\'s so much more to us', buttonText: 'discover it now', to},

    ]
    const cards = aboutCardsData.map(card=><Card key={card.title} {...card} />);
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