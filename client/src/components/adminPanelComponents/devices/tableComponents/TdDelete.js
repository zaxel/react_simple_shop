import React, { useEffect, useContext, useRef, useState } from 'react';
import { Context } from '../../../..';
import withTooltip from '../../../../hocs/withTooltip/withTooltip';
import { deleteDevice } from '../../../../utils/adminDevices';
import { Spinner } from 'react-bootstrap';
import { onClickNoChangeCheckHandler } from '../../../../utils/eventHandlers/commonInputTableFieldsHandlers';

const TdDelete = ({data , innerRef }) => {
    const { deviceId } = data;
    const { toolTip, adminDevices, cart, user } = useContext(Context);
    const [loading, setLoading] = useState(false);
    const onButtonClickHandler = async() => {
        toolTip.setIsToolTipShown(false);
        toolTip.setIsAvailable(false);
        if(window.confirm('are your sure you wanna permanently delete this device?')){
            const cb = deleteDevice.bind(this, deviceId, cart, user);
            onClickNoChangeCheckHandler(setLoading, cb, adminDevices);
        }
        toolTip.setIsAvailable(true);
    }


    useEffect(() => {
        //   destroy all event listeners tooltips
        return () => toolTip?.hoverIntentDestroy();
    }, [])


    if (loading) {
        return (
          <td className="td-spinner">
            <Spinner animation="border" />
          </td>
        )
      }
    return (
        <td ref={innerRef}>
            <button onClick={onButtonClickHandler}>X</button>
        </td>
    );
};

export default withTooltip(TdDelete);