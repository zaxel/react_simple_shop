import React, { useEffect, useContext, useRef, useState } from 'react';
import { Context } from '../../../..';
import withTooltip from '../../../../hocs/withTooltip/withTooltip';

const TdDescriptionLink = ({ data, innerRef }) => {
    const { toolTip, adminDevicesInfo } = useContext(Context);
    const { onDescriptionClickHandler, name } = data;

    const onClickHandler = () => {
        toolTip.setIsToolTipShown(false);
        toolTip.setIsAvailable(false);
        adminDevicesInfo.setDeviceName(name);
        onDescriptionClickHandler(); //show order modal
        toolTip.setIsAvailable(true);
    }
    useEffect(() => {
        //   destroy all event listeners tooltips
        return () => toolTip?.hoverIntentDestroy();
    }, [])

    return (
        <td className='td-active' onClick={onClickHandler} ref={innerRef}>
            descriptions
        </td>
    );
};

export default withTooltip(TdDescriptionLink);