import React from 'react';
import TypeBar from '../components/TypeBar';
import BrandBar from '../components/BrandBar';

const Shop = () => {
    return (
        <div className='shop'>
            <div className='shop__container'>
                <TypeBar/>
                <div className='shop__devices-cont'>
                <BrandBar/>
                    <div>devices cards</div>
                </div>
            </div>
        </div>
    );
};

export default Shop;