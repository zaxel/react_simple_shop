import React, { useEffect, useContext, useRef } from 'react';
import { Context } from '../../../..';
import withTooltip from '../../../../hocs/withTooltip/withTooltip';
import { fetchPage } from '../../../../utils/adminOrders';

const ThAdminOrdersTooltip = ({ data, innerRef}) => {
    const { toolTip, orders, cart, user } = useContext(Context);

    const onThClickHandler = async(data) => {
        toolTip.setIsToolTipShown(false);
        toolTip.setIsAvailable(false);
        if(orders.sortBy === data){
            orders.sortDirection === 'ASC' ? orders.setSortDirection('DESC') : orders.setSortDirection('ASC');
        }else{
            orders.setSortDirection('ASC');
        }
        orders.setSortBy(data);
        await fetchPage(orders, cart, user);
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

export default withTooltip(ThAdminOrdersTooltip);