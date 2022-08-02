import React, { useEffect, useContext, useRef } from 'react';
import { Context } from '../../../..';
import withTooltip from '../../../../hocs/withTooltip/withTooltip';
import { fetchAllDevices, setDevicesToStore } from '../../../../utils/adminDevices';

const ThAdminDevicesTooltip = ({ data, innerRef}) => {
    const { toolTip, adminDevices } = useContext(Context);
    const onThClickHandler = async(data) => {

        adminDevices.setLoading(true);
        toolTip.setIsToolTipShown(false);
        toolTip.setIsAvailable(false);
        if(adminDevices.sortBy === data){
            adminDevices.sortDirection === 'ASC' ? adminDevices.setSortDirection('DESC') : adminDevices.setSortDirection('ASC');
        }else{
            adminDevices.setSortDirection('ASC');
        }
        adminDevices.setSortBy(data);
        const fetchedData = await fetchAllDevices(adminDevices.sortBy, adminDevices.sortDirection, adminDevices.activePage, adminDevices.searchBy, adminDevices.searchByPrase, adminDevices.itemsPerPage);
        setDevicesToStore(adminDevices, fetchedData);
        await adminDevices.setPagesTotal(Math.ceil(adminDevices.devices.count/adminDevices.itemsPerPage));
        adminDevices.setLoading(false);
        toolTip.setIsAvailable(true);
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

export default withTooltip(ThAdminDevicesTooltip);