import React from 'react';
import AboutSubPage from '../../components/about/AboutSubPage';
import { experienceData } from '../../utils/consts/aboutPageData';

const Experience = () => {
    
    return (
        <div className='sub-about'>
            <div className='sub-about__container'>
                <AboutSubPage {...experienceData}/>
            </div>
        </div>
    );
};

export default Experience;