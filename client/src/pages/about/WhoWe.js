import React from 'react';
import AboutSubPage from '../../components/about/AboutSubPage';
import { whoWeData } from '../../utils/consts/aboutPageData';

const WhoWe = () => {
    return (
        <div className='sub-about whoWe'>
            <div className='sub-about__container'>
                <AboutSubPage {...whoWeData}/>
            </div>
        </div>
    );
};

export default WhoWe;