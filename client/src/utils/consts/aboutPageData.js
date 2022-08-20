import { SHOP_ROUTE as to, ABOUT_ROUTE, ABOUT_CARD1_ROUTE, ABOUT_CARD2_ROUTE, ABOUT_CARD3_ROUTE } from '../../utils/consts/routes';

import heroMain1 from '../../assets/about/about_main_1.jpg';
import heroMain2 from '../../assets/about/about_main_2.jpg';
import heroMain3 from '../../assets/about/about_main_3.jpg';

import AboutBlocks from '../../components/about/AboutBlocks';
import heroExp1 from '../../assets/about/exp_hero_1.jpg'
import heroExp2 from '../../assets/about/exp_hero_2.webp';
import heroExp3 from '../../assets/about/exp_hero_3.jpg';
import heroExp4 from '../../assets/about/exp_hero_4.jpg';

import heroBrand1 from '../../assets/about/brand_hero_1.jpg';
import heroBrand2 from '../../assets/about/brand_hero_2.webp';
import heroBrand3 from '../../assets/about/brand_hero_3.jpg';
import heroBrand4 from '../../assets/about/brand_hero_4.jpg';
import heroBrand5 from '../../assets/about/brand_hero_5.jpg';
import heroBrand6 from '../../assets/about/brand_hero_6.jpg';
import heroBrand7 from '../../assets/about/brand_hero_7.gif';
import heroBrand8 from '../../assets/about/brand_hero_8.jpg';

export const aboutMain = [
    {hero: heroMain1, title: 'Who we are', descr: 'Your biggest fans, that\'s who', buttonText: 'read the arazone 101', to: ABOUT_CARD1_ROUTE},
    {hero: heroMain2, title: 'The ARAZONE Brands', descr: 'Made by us, loved by you', buttonText: 'right this way', to: ABOUT_CARD2_ROUTE},
    {hero: heroMain3, title: 'The ARAZONE experience', descr: 'Cos there\'s so much more to us', buttonText: 'discover it now', to: ABOUT_CARD3_ROUTE},

]

export const experienceBlocks = [
    {
        title: 'Free delivery and returns',
        descr: 'We continually strive to make your experience with us as seamless as possible. Or in real speak, we\'re on it with free delivery and returns (Ts&Cs and country exclusions apply). Two of your favourite ARAZONE things… and ours, too 🙌.',
        hero: heroExp1,
        buttons: [{ buttonText: 'get to know', to }]
    },
    {
        title: 'Style Match',
        descr: 'Whether inspired by a look in a magazine or a mate’s vibe, you can now find similar pieces quicker and easier than ever before with our photo search technology. Snap or upload an image and Style Match searches all our products to show you the closest things. Plus, it\'s really fun.',
        hero: heroExp2,
        buttons: [{ buttonText: 'get the android app now', to }, { buttonText: 'get the ios app now', to }]
    },
    {
        title: 'Student discount (10% off until you graduate)',
        descr: 'Being a student can mean you’re low on funds, but don’t worry, we got you. We give students 10% off all the way through to graduation. Cos your budget shouldn’t stop you being you.',
        hero: heroExp3,
        buttons: [{ buttonText: 'get it or regret it', to }]
    },
    {
        title: 'Customer care',
        descr: 'We’re not happy till you are. So we have the friendliest customer care advisors ever working 24/7 to answer your queries (on Facebook, Twitter, live chat, email, Instagram… you name it) – getting back to you asap. And we currently offer this in 11 languages.',
        hero: heroExp4,
        buttons: [{ buttonText: 'discover more', to }]
    },
]
export const experienceData = {
    children: <AboutBlocks blocksData={experienceBlocks} />,
    title: 'The ARAZONE experience.',
    descr: 'At ARAZONE, we never settle. We have an always testing, ‘always in beta’ philosophy, constantly improving to make it all just that bit better every day. From free delivery and returns to innovative visual search tech, if it hasn’t been done before, we find a way to do it anyway.',
    to: ABOUT_ROUTE,
}

export const brandBlocks = [
    {
        title: 'ARAZONE DESIGN',
        descr: 'Giving you the confidence to express your individuality, ARAZONE DESIGN interprets major trends, adding that next-level ARAZONE spin. Representing in our size ranges (ARAZONE Curve, Tall, Petite and Maternity), we\'ve got all the stuff you need to invent a style that’s all yours… making every day, night and everything in-between as extraordinary as you are.',
        hero: heroBrand1,
        buttons: [{ buttonText: 'shop women', to }, { buttonText: 'shop men', to }]
    },
    {
        title: 'ARAZONE EDITION',
        descr: 'ARAZONE EDITION is designed for the most memorable moments of your life so you can turn up and stand out in occasionwear that’s as unique as you. In our size ranges and including our beautiful ARAZONE EDITION Wedding Collection, we\'ll have you dancing before the party\'s even begun.',
        hero: heroBrand2,
        buttons: [{ buttonText: 'shop women', to }, { buttonText: 'shop men', to }]
    },
    {
        title: 'ARAZONE WHITE',
        descr: 'Backing oversized fits with a minimal, clean aesthetic, ARAZONE WHITE is here to elevate your every day. Believing investment pieces don’t have to compromise on individuality, it creates understated staples with a modern twist that you’ll be proud to wear – not to mention look damn cool in.',
        hero: heroBrand3,
        buttons: [{ buttonText: 'shop women', to }, { buttonText: 'shop men', to }]
    },
    {
        title: 'ARAZONE MADE IN KENYA',
        descr: 'No longer a choice between conscience and self-expression, we believe fashion has the power to build futures. That’s why our exclusive ARAZONE MADE IN KENYA collection works with SOKO Kenya to improve the lives of local communities by offering skills and support to drive sustainable development. Does good, looks good.',
        hero: heroBrand4,
        buttons: [{ buttonText: 'shop women', to }, { buttonText: 'shop men', to }]
    },
    {
        title: 'ARAZONE 4505',
        descr: 'Our new activewear brand offers pieces for all your adventures. Whether you\'re running or raving, ARAZONE 4505 has the very best kit to ensure your playtime has serious style and personality. It’s our movement for movement (and you’re all invited) 💪',
        hero: heroBrand5,
        buttons: [{ buttonText: 'shop women', to }, { buttonText: 'shop men', to }]
    },
    {
        title: 'ARAZONE collabs',
        descr: 'We collaborate with some of the world\'s biggest names like Crayola, The Simpsons, LaQuan Smith, GLAAD and VFILES to design cool collections you won\'t find anywhere else. We do the hard work, you look amazing… deal?',
        hero: heroBrand6,
        buttons: []
    },
    {
        title: 'The big-brand edit',
        descr: 'It doesn’t stop with our own amazing ARAZONE Brands, either. We have that same love for other labels, choosing only the best pieces from their collections to give you all the things you want to wear… as well as some things you never imagined you’d fall for. Win-win.',
        hero: heroBrand7,
        buttons: [{ buttonText: 'shop women', to }, { buttonText: 'shop men', to }]
    },
    {
        title: 'Brands you\'ll only find at ARAZONE',
        descr: 'As well as our roster of ARAZONE Brands, we’ve also got a slick range of labels you won’t find anywhere else. Channel the Scandi aesthetic with Noak, up the retro vibes with Reclaimed Vintage, stock up on smart stuff with Heart & Dagger and champion young UK design talent with exclusive new brand, COLLUSION.',
        hero: heroBrand8,
        buttons: []
    },
    
]
export const brandData = {
    children: <AboutBlocks blocksData={brandBlocks}/>, 
    title: 'The ARAZONE Brands.', 
    descr: 'We don\'t do fashion like anyone else does fashion. Our ARAZONE Brands, created by our London design team, look between the lines to bring you the freshest clothing, shoes, accessories and gifts. When it comes to our curation of brands at ARAZONE, we select the best of those to give you the biggest variety, amazing exclusives and coolest collaborations. And in case that wasn\'t enough, we\'ve also got a range of first-rate Face + Body products you can express yourself with, too. There are no rules – just endless ways to be you.', 
    to: ABOUT_ROUTE}