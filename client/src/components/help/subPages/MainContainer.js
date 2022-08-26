import React from 'react';
import CategoryBanner from '../CategoryBanner';
import CategoryListCont from './CategoryListCont';

const MainContainer = ({...rest}) => {
    return (
        <div className='help__category'>
            <CategoryBanner {...rest}/>
            <CategoryListCont {...rest}/>
        </div>
    );
};

export default MainContainer;