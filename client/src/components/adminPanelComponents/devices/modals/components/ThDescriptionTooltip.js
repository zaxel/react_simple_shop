import React, { useEffect, useContext, useRef } from 'react';
import { Context } from '../../../../..';
import withTooltip from '../../../../../hocs/withTooltip/withTooltip';
import { fetchAllDevices } from '../../../../../utils/adminDevices';

const ThDescriptionTooltip = ({ data, innerRef}) => {
    const { toolTip, devices } = useContext(Context);

    const onThClickHandler = async(data) => {
        console.log('sort')
        // devices.setLoading(true);
        // toolTip.setIsToolTipShown(false);
        // toolTip.setIsAvailable(false);
        // if(devices.sortBy === data){
        //     devices.sortDirection === 'ASC' ? devices.setSortDirection('DESC') : devices.setSortDirection('ASC');
        // }else{
        //     devices.setSortDirection('ASC');
        // }
        // devices.setSortBy(data);
        // await fetchAllDevices(devices, devices.sortBy, devices.sortDirection, devices.itemsPerPage, devices.activePage, devices.searchBy, devices.searchByPrase);
        // await devices.setPagesTotal(Math.ceil(devices.devices.count/devices.itemsPerPage));
        // devices.setLoading(false);
        // toolTip.setIsAvailable(true);
    }



    useEffect(() => {
        //   destroy all event listeners tooltips
        
        return () => {
            if(typeof toolTip.hoverIntentDestroy === 'function')
                return toolTip?.hoverIntentDestroy()
        };
    }, [])

    return (
        <th className={!data.sortBy ? 'no-before' : null} onClick={data.sortBy && onThClickHandler.bind(this, data.sortBy)} ref={innerRef}>{data.title}</th>
    );
};

export default withTooltip(ThDescriptionTooltip);