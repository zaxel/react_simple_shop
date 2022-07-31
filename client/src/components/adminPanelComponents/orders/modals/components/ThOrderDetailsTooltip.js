import React, { useEffect, useContext } from 'react';
import { Context } from '../../../../../';
import withTooltip from '../../../../../hocs/withTooltip/withTooltip';
import { fetchOrderDetails } from '../../../../../utils/adminOrders';

const ThOrderDetailsTooltip = ({ data, innerRef}) => {
    const { toolTip, orderDetails, cart, user } = useContext(Context);

    const onThClickHandler = async(data) => {
        toolTip.setIsToolTipShown(false);
        toolTip.setIsAvailable(false);
        if(orderDetails.sortBy === data){
            orderDetails.sortDirection === 'ASC' ? orderDetails.setSortDirection('DESC') : orderDetails.setSortDirection('ASC');
        }else{
            orderDetails.setSortDirection('ASC');
        }
        orderDetails.setSortBy(data);
        await fetchOrderDetails(orderDetails, orderDetails.orderId, cart, user);
        toolTip.setIsAvailable(true);
    }

    useEffect(() => {
        //   destroy all event listeners tooltips
        
        return () => {
            if(typeof toolTip.hoverIntentDestroy === 'function')
                return toolTip?.hoverIntentDestroy()
        };
    }, [])

    return (
        <th className={!data.sortBy ? 'no-before' : null} onClick={data.sortBy && onThClickHandler.bind(this, data.sortBy)} ref={innerRef}>{data.title}</th>
    );
};

export default withTooltip(ThOrderDetailsTooltip);