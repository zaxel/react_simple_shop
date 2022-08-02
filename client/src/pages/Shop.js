import React, { useContext, useEffect } from 'react';
import TypeBar from '../components/TypeBar';
import BrandBar from '../components/BrandBar';
import DeviceItems from '../components/DeviceItems';
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import { fetchPage } from '../utils/adminDevices';
import { fetchSetBrands, fetchSetTypes } from '../utils/adminDevices';
import PaginationCont from '../components/PaginationCont';
import { Spinner } from 'react-bootstrap';

const Shop = observer(() => {
    const { device } = useContext(Context);

    useEffect(() => {
        try {
            fetchSetTypes(device);
            fetchSetBrands(device);
            fetchPage(device);

        } catch (e) {
            console.log(e)
        }
    }, [])

    useEffect(() => {
        fetchPage(device);
    }, [device.activePage, device.brandActive, device.typeActive])

    if (device.loading) {
        return (
            <div className="spinner spinner__shop">
                <Spinner animation="border" />
            </div>
        )
    }
    return (
        <div className='shop'>
            {device.devices.rows && <div className='shop__container'>
                <TypeBar />
                <div className='shop__devices-cont'>
                    <BrandBar />
                    <DeviceItems />
                    <PaginationCont currentStore={device} />
                </div>
            </div>}
        </div>
    );
});

export default Shop;