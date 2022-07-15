import React, { useEffect, useContext } from 'react';
import { Context } from '../../../../..';
import withTooltip from '../../../../../hocs/withTooltip/withTooltip';
import { fetchAllInfo } from '../../../../../utils/adminDeviceInfo';

const ThDescriptionTooltip = ({ data, innerRef}) => {
    const { toolTip, adminDevicesInfo } = useContext(Context);

    const onThClickHandler = async(data) => {
        adminDevicesInfo.setLoading(true);
        toolTip.setIsToolTipShown(false);
        toolTip.setIsAvailable(false);
        if(adminDevicesInfo.sortBy === data){
            adminDevicesInfo.sortDirection === 'ASC' ? adminDevicesInfo.setSortDirection('DESC') : adminDevicesInfo.setSortDirection('ASC');
        }else{
            adminDevicesInfo.setSortDirection('ASC');
        }
        adminDevicesInfo.setSortBy(data);
        await fetchAllInfo(adminDevicesInfo, adminDevicesInfo.deviceId, adminDevicesInfo.sortBy, adminDevicesInfo.sortDirection);
        adminDevicesInfo.setLoading(false);
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

export default withTooltip(ThDescriptionTooltip);