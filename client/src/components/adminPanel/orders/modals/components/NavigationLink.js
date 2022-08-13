import React, { useEffect, useContext } from 'react';
import { Context } from '../../../../..';
import withTooltip from '../../../../../hocs/withTooltip/withTooltip';
import { NavLink } from 'react-router-dom';
import { ADMIN_DEVICES_ROUTE } from '../../../../../utils/consts';

const NavigationLink = ({ data, innerRef }) => {


    const { linkText, deviceId } = data;
    const { toolTip, adminDevices } = useContext(Context);

    useEffect(() => {
        //   destroy all event listeners tooltips
        return () => toolTip?.hoverIntentDestroy();
    }, [])

    const onLinkClickHandler = (e)=> {
        toolTip.setIsToolTipShown(false);
        adminDevices.setSearchBy('id');
        adminDevices.setSearchByPrase(deviceId);
    }
    return (
        <td ref={innerRef}>
            <NavLink onClick={onLinkClickHandler} className="table__link" to={ADMIN_DEVICES_ROUTE}>{linkText}</NavLink>
        </td>
    );
};

export default withTooltip(NavigationLink);