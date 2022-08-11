import React, { useEffect, useContext } from 'react';
import { Context } from '../../../../..';
import withTooltip from '../../../../../hocs/withTooltip/withTooltip';
import { fetchInfo, setInfoToStore } from '../../../../../utils/administration/adminDeviceInfo';

const ThDescriptionTooltip = ({ data, innerRef}) => {
    const { toolTip, adminDevicesInfo, cart, user } = useContext(Context);

    const onThClickHandler = async(data) => {
        toolTip.setIsToolTipShown(false);
        toolTip.setIsAvailable(false);
        if(adminDevicesInfo.sortBy === data){
            adminDevicesInfo.sortDirection === 'ASC' ? adminDevicesInfo.setSortDirection('DESC') : adminDevicesInfo.setSortDirection('ASC');
        }else{
            adminDevicesInfo.setSortDirection('ASC');
        }
        adminDevicesInfo.setSortBy(data);
        const fetchedInfo = await fetchInfo(adminDevicesInfo, adminDevicesInfo.deviceId, adminDevicesInfo.sortBy, adminDevicesInfo.sortDirection, cart, user);
        if(fetchedInfo.loggedOut)return;
        setInfoToStore(adminDevicesInfo, fetchedInfo);
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