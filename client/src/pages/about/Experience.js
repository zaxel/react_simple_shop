import React from 'react';
import AboutSubPage from '../../components/about/AboutSubPage';
import ExperienceBlocks from '../../components/about/ExperienceBlocks';
import { ABOUT_ROUTE as to } from '../../utils/consts/routes';


const Experience = () => {
    const componentData = {
        children: <ExperienceBlocks/>, 
        title: 'The ARAZONE experience.', 
        descr: 'At ARAZONE, we never settle. We have an always testing, ‘always in beta’ philosophy, constantly improving to make it all just that bit better every day. From free delivery and returns to innovative visual search tech, if it hasn’t been done before, we find a way to do it anyway.', 
        to}
    return (
        <div className='sub-about'>
            <div className='sub-about__container'>
                <AboutSubPage {...componentData}/>
            </div>
        </div>
    );
};

export default Experience;