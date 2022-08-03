import React, { useEffect, useContext, useState } from 'react';
import { Context } from '../../../..';
import withTooltip from '../../../../hocs/withTooltip/withTooltip';
import { deleteBrand } from '../../../../utils/adminBrands';
import { Spinner } from 'react-bootstrap';

const TdDelete = ({data , innerRef }) => {
    const { id } = data;
    const { toolTip, brands, cart, user } = useContext(Context);
    const [loading, setLoading] = useState(false);
    const onButtonClickHandler = async() => {
        toolTip.setIsToolTipShown(false);
        toolTip.setIsAvailable(false);
        if(window.confirm('are your sure you wanna permanently remove this device brand?')){
            setLoading(true);
            const { loggedOut } = await deleteBrand(id, cart, user); 
            if(loggedOut)return;
            setLoading(false);
            brands.setUpdateDataTrigger(prev=>!brands.updateDataTrigger);
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