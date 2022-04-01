import React, { useContext, useEffect } from 'react';
import TypeBar from '../components/TypeBar';
import BrandBar from '../components/BrandBar';
import DeviceItems from '../components/DeviceItems';
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import { fetchAllDevices, fetchBrands, fetchTypes } from '../http/deviceAPI';
import PaginationCont from '../components/PaginationCont';

const Shop = observer(() => {
   const {device} = useContext(Context);

   useEffect(()=>{
    fetchTypes().then(data=>{
        device.setTypes(data);
    })
    fetchBrands().then(data=>{
        device.setBrands(data);
    })
    fetchAllDevices(null, null, device.itemsPerPage, device.activePage)
        .then(data=>device.setDevices(data))
        .then(data=>device.setPagesTotal(Math.ceil(device.devices.count/device.itemsPerPage)))
   }, [])

   useEffect(()=>{
    fetchAllDevices(device.brandActive, device.typeActive, device.itemsPerPage, device.activePage)
    .then(data=>device.setDevices(data))
    .then(data=>{
        device.setPagesTotal(Math.ceil(device.devices.count/device.itemsPerPage));
    })
   }, [device.activePage, device.brandActive, device.typeActive])

    return (
        <div className='shop'>
            <div className='shop__container'>
                <TypeBar/>
                <div className='shop__devices-cont'>
                    <BrandBar/>
                    <DeviceItems/>
                    <PaginationCont/>
                </div>
            </div>
        </div>
    );
});

export default Shop;