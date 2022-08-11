import React, { useEffect, useContext, useRef } from 'react';
import { Context } from '../../../../..';
import withTooltip from '../../../../../hocs/withTooltip/withTooltip';
import { fetchPage } from '../../../../../utils/adminUsers';
import { fetchUserOrders } from '../../../../../utils/adminUserOrders';

const ThAdminUserOrdersTooltip = ({ data, innerRef}) => {
    const { toolTip, userOrders, cart, user } = useContext(Context);

    const onThClickHandler = async(data) => {
        toolTip.setIsToolTipShown(false);
        toolTip.setIsAvailable(false);
        if(userOrders.sortBy === data){
            userOrders.sortDirection === 'ASC' ? userOrders.setSortDirection('DESC') : userOrders.setSortDirection('ASC');
        }else{
            userOrders.setSortDirection('ASC');
        }
        userOrders.setSortBy(data);
        // await fetchPage(userOrders, cart, user);
        await fetchUserOrders(userOrders, cart, user);
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

export default withTooltip(ThAdminUserOrdersTooltip);