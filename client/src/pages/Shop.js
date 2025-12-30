import React, { useContext, useEffect } from 'react';
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
import TypeBarLg from '../components/TypeBar/TypeBarLg';
import TypeBarSm from '../components/TypeBar/TypeBarSm';
import BrandBarLg from '../components/BrandBar/BrandBarLg';
import BrandBarSm from '../components/BrandBar/BrandBarSm';

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
        return <div className="flex-auto w-full h-[92dvh] flex justify-center items-center">
                    <Spinner  className="w-8 h-8"/>
                </div>
    }
    return (
        <div className='shop'>
            {device.devices.rows && <div className='shop__container'>
                <div className='hidden lg:block'>
                    <TypeBarLg />
                </div> 
                <div className='shop__devices-cont'>
                    <div className='flex justify-start items-center gap-6'>
                        <div className='lg:hidden'>
                            <TypeBarSm />
                        </div>
                        <div className='hidden lg:block'>
                            <BrandBarLg />
                        </div>
                        <div className='lg:hidden'>
                            <BrandBarSm />
                        </div>
                    </div>
                    {/* <SearchBar setSearchParams={setSearchParams}/> */}
                    <DeviceItems />
                    <PaginationCont currentStore={device} />
                </div>
            </div>}
        </div>
    );
});

export default Shop;