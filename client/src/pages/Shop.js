import React, { useContext, useEffect } from 'react';
import TypeBar from '../components/TypeBar';
import BrandBar from '../components/BrandBar';
import DeviceItems from '../components/device/DeviceItems';
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import { fetchPage } from '../utils/administration/adminDevices';
import { fetchSetBrands, fetchSetTypes } from '../utils/administration/adminDevices';
import PaginationCont from '../components/PaginationCont';
import { Spinner } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import { getQueryParamsString, setQueryParamsString } from '../utils/http/queryParams';
import SearchBar from '../components/SearchBar';

const Shop = observer(() => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { device } = useContext(Context);

    useEffect(() => {
        try {
            fetchSetTypes(device);
            fetchSetBrands(device);
            getQueryParamsString(searchParams, device);
            fetchPage(device);

        } catch (e) {
            console.log(e)
        }
    }, [])

    useEffect(() => {
        setQueryParamsString(setSearchParams, device);
        fetchPage(device);
    }, [device.activePage, device.brandActive, device.typeActive, device.searchKey])

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
                    <SearchBar setSearchParams={setSearchParams}/>
                    <DeviceItems />
                    <PaginationCont currentStore={device} />
                </div>
            </div>}
        </div>
    );
});

export default Shop;