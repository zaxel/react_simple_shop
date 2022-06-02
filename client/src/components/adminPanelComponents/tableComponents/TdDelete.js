import React, { useEffect, useContext, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Context } from '../../..';
import withTooltip from '../../../hocs/withTooltip/withTooltip';
import { deleteUser } from '../../../utils/adminUsers';
import { Spinner } from 'react-bootstrap';

const TdDelete = ({data , innerRef }) => {
    const { userId } = data;
    const { toolTip, users } = useContext(Context);
    const [loading, setLoading] = useState(false);
    const onButtonClickHandler = async() => {
        toolTip.setIsToolTipShown(false);
        toolTip.setIsAvailable(false);
        if(window.confirm('are your sure you wanna permanently remove this user?')){
            setLoading(true);
            await deleteUser(userId);
            setLoading(false);
            users.setUpdateDataTrigger(prev=>!users.updateDataTrigger());
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