import React, {useContext} from 'react';
import AboutSubPage from '../../components/about/AboutSubPage';
import { brandData } from '../../utils/consts/aboutPageData';
import { Context } from '../..';


const TheBrands = () => {
    const { aboutPage } = useContext(Context);
    return (
        <div className='sub-about'>
            <div className='sub-about__container'>
                <AboutSubPage {...brandData}/>
            </div>
        </div>
    );
};

export default TheBrands;