import React, { useEffect, useContext, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Context } from '../../..';
import withTooltip from '../../../hocs/withTooltip/withTooltip';

const TdModalLink = ({ data, innerRef }) => {

    const { toolTip } = useContext(Context);


    const onClickHandler = () => {
        toolTip.setIsToolTipShown(false);
        toolTip.setIsAvailable(false);

        data(); //show order modal
        toolTip.setIsAvailable(true);
    }


    useEffect(() => {
        //   destroy all event listeners tooltips
        return () => toolTip?.hoverIntentDestroy();
    }, [])



    return (
        <td className='td-active' onClick={onClickHandler} ref={innerRef}>
            orders
        </td>
    );
};

export default withTooltip(TdModalLink);