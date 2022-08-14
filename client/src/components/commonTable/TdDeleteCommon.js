import React, { useEffect, useContext, useState } from 'react';
import { Context } from '../..';
import withTooltip from '../../hocs/withTooltip/withTooltip';
import { Spinner } from 'react-bootstrap';
import { onClickNoChangeCheckHandler } from '../../utils/eventHandlers/commonInputTableFieldsHandlers';

const TdDeleteCommon = ({data , innerRef }) => {
    const { id, store, deleteCb } = data;
    const { toolTip, cart, user } = useContext(Context);
    const [loading, setLoading] = useState(false);
    const onButtonClickHandler = async() => {
        toolTip.setIsToolTipShown(false);
        toolTip.setIsAvailable(false);
        if(window.confirm('are your sure you wanna permanently remove this device brand?')){
            const cb = deleteCb.bind(this, id, cart, user);
            onClickNoChangeCheckHandler(setLoading, cb, store);
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

export default withTooltip(TdDeleteCommon);