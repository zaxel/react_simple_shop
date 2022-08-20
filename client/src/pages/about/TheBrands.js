import React from 'react';
import AboutSubPage from '../../components/about/AboutSubPage';
import { brandData } from '../../utils/consts/aboutPageData';

const TheBrands = () => {
    return (
        <div className='sub-about'>
            <div className='sub-about__container'>
                <AboutSubPage {...brandData}/>
            </div>
        </div>
    );
};

export default TheBrands;