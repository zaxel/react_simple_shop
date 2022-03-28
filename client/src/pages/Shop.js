import React, { useContext, useEffect } from 'react';
import TypeBar from '../components/TypeBar';
import BrandBar from '../components/BrandBar';
import DeviceItems from '../components/DeviceItems';
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import { fetchAllDevices, fetchBrands, fetchTypes } from '../http/deviceAPI';

const Shop = observer(() => {
   const {device} = useContext(Context);

   useEffect(()=>{
    fetchTypes().then(data=>{
        device.setTypes(data)
    })
    fetchBrands().then(data=>{
        device.setBrands(data)
    })
    fetchAllDevices().then(data=>{
        console.log(data)
        device.setDevices(data)
    })
   }, [])
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
});

export default Shop;