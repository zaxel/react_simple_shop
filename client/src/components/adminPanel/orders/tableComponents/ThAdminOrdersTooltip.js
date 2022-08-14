import React, { useEffect, useContext, useRef } from 'react';
import { Context } from '../../../..';
import withTooltip from '../../../../hocs/withTooltip/withTooltip';
import { fetchPage } from '../../../../utils/administration/adminOrders';
import { onSortTableClickHandler } from '../../../../utils/administration/common';

const ThAdminOrdersTooltip = ({ data, innerRef}) => {
    const { toolTip, orders, cart, user } = useContext(Context);

    const onThClickHandler = async(data) => {
        const cb = async() => await fetchPage(orders, cart, user)
        const flags = { setLoading: false, setPageTotal: false};
        onSortTableClickHandler(cb, data, orders, toolTip, flags);
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