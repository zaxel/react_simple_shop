import React from 'react';
import { SHOP_ROUTE as to } from '../../utils/consts/routes';
import ExperienceBlock from './ExperienceBlock';
import hero1 from '../../assets/about/exp_hero_1.jpg'
import hero2 from '../../assets/about/exp_hero_2.webp';
import hero3 from '../../assets/about/exp_hero_3.jpg';
import hero4 from '../../assets/about/exp_hero_4.jpg';

const  ExperienceBlocks = () => {
    const blocksData = [
        {
            title: 'Free delivery and returns', 
            descr: 'We continually strive to make your experience with us as seamless as possible. Or in real speak, we\'re on it with free delivery and returns (Ts&Cs and country exclusions apply). Two of your favourite ARAZONE things… and ours, too 🙌.',
            hero: hero1,
            buttons: [{buttonText: 'get to know', to}]
        },
        {
            title: 'Style Match', 
            descr: 'Whether inspired by a look in a magazine or a mate’s vibe, you can now find similar pieces quicker and easier than ever before with our photo search technology. Snap or upload an image and Style Match searches all our products to show you the closest things. Plus, it\'s really fun.', 
            hero: hero2,
            buttons: [{buttonText: 'get the android app now', to}, {buttonText: 'get the ios app now', to}]
        },
        {
            title: 'Student discount (10% off until you graduate)', 
            descr: 'Being a student can mean you’re low on funds, but don’t worry, we got you. We give students 10% off all the way through to graduation. Cos your budget shouldn’t stop you being you.', 
            hero: hero3,
            buttons: [{buttonText: 'get it or regret it', to}]
        },
        {
            title: 'Customer care', 
            descr: 'We’re not happy till you are. So we have the friendliest customer care advisors ever working 24/7 to answer your queries (on Facebook, Twitter, live chat, email, Instagram… you name it) – getting back to you asap. And we currently offer this in 11 languages.', 
            hero: hero4,
            buttons: [{buttonText: 'discover more', to}]
        },
    ]

    const blocks = blocksData.map(block=><ExperienceBlock key={block.title} {...block}/>)
    
    return (
        <div className='sub-about__blocks'>
            {blocks}
        </div>
    );
};

export default ExperienceBlocks;