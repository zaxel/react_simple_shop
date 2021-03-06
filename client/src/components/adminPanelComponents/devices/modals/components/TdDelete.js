import React, { useEffect, useContext, useRef, useState } from 'react';
import { Context } from '../../../../..';
import withTooltip from '../../../../../hocs/withTooltip/withTooltip';
import { deleteDeviceInfoLine } from '../../../../../utils/adminDeviceInfo';
import { Spinner } from 'react-bootstrap';

const TdDelete = ({data , innerRef }) => {
    const { descriptionId } = data;
    const { toolTip, adminDevicesInfo } = useContext(Context);
    const [loading, setLoading] = useState(false);
    const onButtonClickHandler = async() => {
        toolTip.setIsToolTipShown(false);
        toolTip.setIsAvailable(false);
        if(window.confirm('are your sure you wanna permanently remove this description?')){
            setLoading(true);
            await deleteDeviceInfoLine(descriptionId);
            adminDevicesInfo.setUpdateDataTrigger(prev=>!adminDevicesInfo.updateDataTrigger());
            setLoading(false);
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