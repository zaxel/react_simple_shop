import React, { useEffect, useContext, useRef } from 'react';
import { Context } from '../../../..';
import withTooltip from '../../../../hocs/withTooltip/withTooltip';
import { fetchAll, setDataToStore, onSortTableClickHandler } from '../../../../utils/administration/common';
import { fetchAllDevices } from '../../../../http/deviceAPI';

const ThAdminDevicesTooltip = ({ data, innerRef, setSearchParams}) => {
    const { toolTip, adminDevices } = useContext(Context);

    const onThClickHandler = (data) => {
        const cb = async() => await fetchAll(fetchAllDevices, null, adminDevices.sortBy, adminDevices.sortDirection, adminDevices.itemsPerPage, adminDevices.activePage, adminDevices.searchBy, adminDevices.searchByPrase)
        const flags = { setLoading: true, setPageTotal: true};
        onSortTableClickHandler(cb, data, adminDevices, toolTip, flags, setSearchParams);
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