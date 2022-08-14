import React, { useEffect, useContext } from 'react';
import { Context } from '../../../..';
import withTooltip from '../../../../hocs/withTooltip/withTooltip';
import { fetchAll, onSortTableClickHandler } from '../../../../utils/administration/common';
import { fetchAllTypes } from '../../../../http/deviceAPI';

const ThAdminTypesTooltip = ({ data, innerRef}) => {
    const { toolTip, types } = useContext(Context);

    const onThClickHandler = async(data) => {
        const cb = async() => await fetchAll(fetchAllTypes, null, types.sortBy, types.sortDirection);
        const flags = { setLoading: true, setPageTotal: false};
        onSortTableClickHandler(cb, data, types, toolTip, flags);
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

export default withTooltip(ThAdminTypesTooltip);