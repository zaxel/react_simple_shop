import React, { useEffect, useContext, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Context } from '../../..';
import withTooltip from '../../../hocs/withTooltip/withTooltip';

const TdDelete = ({ innerRef }) => {

    const { toolTip } = useContext(Context);


    const onButtonClickHandler = () => {
        toolTip.setIsToolTipShown(false);
        toolTip.setIsAvailable(false);
        if(window.confirm('your sure you wanna permanently remove this user?')){
            alert('user removed!');
        }
        toolTip.setIsAvailable(true);
    }


    useEffect(() => {
        //   destroy all event listeners tooltips
        return () => toolTip?.hoverIntentDestroy();
    }, [])



    return (
        <td ref={innerRef}>
            <button onClick={onButtonClickHandler}>X</button>
        </td>
    );
};

export default withTooltip(TdDelete);