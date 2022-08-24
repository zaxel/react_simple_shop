import React from 'react';
import CategoryBanner from '../CategoryBanner';
import CategoryListCont from './CategoryListCont';

const MainContainer = () => {
    return (
        <div className='help__category'>
            <CategoryBanner/>
            <CategoryListCont/>
        </div>
    );
};

export default MainContainer;