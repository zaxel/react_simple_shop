import React, { useEffect, useContext, useRef, useState } from 'react';
import { Context } from '../../../../..';
import withTooltip from '../../../../../hocs/withTooltip/withTooltip';
import { deleteDeviceInfoLine } from '../../../../../utils/administration/adminDeviceInfo';
import { Spinner } from 'react-bootstrap';
import { onClickNoChangeCheckHandler } from '../../../../../utils/eventHandlers/commonInputTableFieldsHandlers';

const TdDelete = ({data , innerRef }) => {
    const { descriptionId } = data;
    const { toolTip, adminDevicesInfo, cart, user } = useContext(Context);
    const [loading, setLoading] = useState(false);

    const onButtonClickHandler = async() => {
        toolTip.setIsToolTipShown(false);
        toolTip.setIsAvailable(false);
        if(window.confirm('are your sure you wanna permanently remove this description?')){
            const cb = deleteDeviceInfoLine.bind(this, descriptionId, cart, user);
            onClickNoChangeCheckHandler(setLoading, cb, adminDevicesInfo);
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