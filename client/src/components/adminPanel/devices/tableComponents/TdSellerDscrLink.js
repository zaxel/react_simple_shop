import React, { useEffect, useContext, useRef, useState } from 'react';
import { Context } from '../../../..';
import withTooltip from '../../../../hocs/withTooltip/withTooltip';
import { Spinner } from 'react-bootstrap';

const TdSellerDscrLink = ({ data, innerRef }) => {
    const [loading, setLoading] = useState(false);

    const { toolTip, adminDevices} = useContext(Context);
    const { onSellerDscrClickHandler, id} = data;

    const onClickHandler = async () => {
        try{
            setLoading(true);
            toolTip.setIsToolTipShown(false);
            toolTip.setIsAvailable(false);
            await adminDevices.setDeviceActive(id); 
            onSellerDscrClickHandler(); //show order modal

        }catch(e){
            console.log('error occur while trying to set active device in admin menu!');
            console.log(e);
        }finally{
            toolTip.setIsAvailable(true);
            setLoading(false);
        }
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
        <td className='td-active' onClick={onClickHandler} ref={innerRef}>
            seller description
        </td>
    );
};

export default withTooltip(TdSellerDscrLink);