import React from 'react';
import delivery_banner from '../../assets/help/delivery_banner.avif'

const CategoryBanner = () => {
    return (
        <div className='help__cat-banner'>
            <img src={delivery_banner} alt='help category hero'/>
            <h3>delivery</h3>
        </div>
    );
};

export default CategoryBanner;