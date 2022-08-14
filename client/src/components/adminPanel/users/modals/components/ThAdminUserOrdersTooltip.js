import React, { useEffect, useContext, useRef } from 'react';
import { Context } from '../../../../..';
import withTooltip from '../../../../../hocs/withTooltip/withTooltip';
import { fetchUserOrders } from '../../../../../utils/administration/adminUserOrders';
import { onSortTableClickHandler } from '../../../../../utils/administration/common';

const ThAdminUserOrdersTooltip = ({ data, innerRef}) => {
    const { toolTip, userOrders, cart, user } = useContext(Context);

    const onThClickHandler = async(data) => {
        const cb = async() => await fetchUserOrders(userOrders, cart, user);
        const flags = { setLoading: false, setPageTotal: false};
        onSortTableClickHandler(cb, data, userOrders, toolTip, flags);
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