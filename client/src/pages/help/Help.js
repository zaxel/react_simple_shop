import React from 'react';
import Banner from './Banner';
import Cards from './Cards';
import Footer from './Footer';
import { helpCategories } from '../../utils/consts/helpPageData';

const Help = () => {
    return (
        <div className='help'>
            <div className='help__container'>
                <Banner/>
                <Cards helpCategories={helpCategories}/>
                <Footer/>
            </div>
        </div>
    );
};

export default Help;