import React, { useEffect, useContext } from 'react';
import { Context } from '../../../../../';
import withTooltip from '../../../../../hocs/withTooltip/withTooltip';
// import { fetchAllOrderDetails } from '../../../../../utils/adminOrders';

const ThOrderDetailsTooltip = ({ data, innerRef}) => {
    const { toolTip, orderDetails } = useContext(Context);

    const onThClickHandler = async(data) => {
        orderDetails.setLoading(true);
        toolTip.setIsToolTipShown(false);
        toolTip.setIsAvailable(false);
        if(orderDetails.sortBy === data){
            orderDetails.sortDirection === 'ASC' ? orderDetails.setSortDirection('DESC') : orderDetails.setSortDirection('ASC');
        }else{
            orderDetails.setSortDirection('ASC');
        }
        orderDetails.setSortBy(data);
        // await fetchAllOrderDetails(orderDetails, orderDetails.sortBy, orderDetails.sortDirection);
        orderDetails.setLoading(false);
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