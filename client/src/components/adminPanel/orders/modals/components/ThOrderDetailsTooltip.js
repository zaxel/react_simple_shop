import React, { useEffect, useContext } from 'react';
import { Context } from '../../../../../';
import withTooltip from '../../../../../hocs/withTooltip/withTooltip';
import { fetchOrderDetails } from '../../../../../utils/administration/adminOrders';
import { onSortTableClickHandler } from '../../../../../utils/administration/common';

const ThOrderDetailsTooltip = ({ data, innerRef}) => {
    const { toolTip, orderDetails, cart, user } = useContext(Context);

    const onThClickHandler = async(data) => {
        const cb = async() => await fetchOrderDetails(orderDetails, orderDetails.orderId, cart, user);
        const flags = { setLoading: false, setPageTotal: false};
        onSortTableClickHandler(cb, data, orderDetails, toolTip, flags);
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