import React, { useEffect, useContext } from 'react';
import { Context } from '../../../../..';
import withTooltip from '../../../../../hocs/withTooltip/withTooltip';
import { fetchInfo } from '../../../../../utils/administration/adminDeviceInfo';
import { onSortTableClickHandler } from '../../../../../utils/administration/common';

const ThDescriptionTooltip = ({ data, innerRef}) => {
    const { toolTip, adminDevicesInfo, cart, user } = useContext(Context);

    const onThClickHandler = async(data) => {
        const cb = async() => await fetchInfo(adminDevicesInfo, adminDevicesInfo.deviceId, adminDevicesInfo.sortBy, adminDevicesInfo.sortDirection, cart, user);
        const flags = { setLoading: false, setPageTotal: false};
        onSortTableClickHandler(cb, data, adminDevicesInfo, toolTip, flags);
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