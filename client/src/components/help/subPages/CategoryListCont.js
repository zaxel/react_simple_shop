import React from 'react';
import Progress from './Progress';
import CategoryList from './CategoryList';
import Button from './Button';

const CategoryListCont = () => {
    return (
        <div className='popular-cont help__cat-list'>
            <CategoryList/>
            <Progress/>
            <Button/>
        </div>
    );
};

export default CategoryListCont;