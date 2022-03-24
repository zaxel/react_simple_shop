import React from 'react';
import TypeBar from '../components/TypeBar';
import BrandBar from '../components/BrandBar';
import DeviceItems from '../components/DeviceItems';

const Shop = () => {
    return (
        <div className='shop'>
            <div className='shop__container'>
                <TypeBar/>
                <div className='shop__devices-cont'>
                    <BrandBar/>
                    <DeviceItems/>
                </div>
            </div>
        </div>
    );
};

export default Shop;