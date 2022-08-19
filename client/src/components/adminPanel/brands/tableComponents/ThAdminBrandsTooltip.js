import React, { useEffect, useContext, useRef } from 'react';
import { Context } from '../../../..';
import withTooltip from '../../../../hocs/withTooltip/withTooltip';
import { fetchAll, onSortTableClickHandler } from '../../../../utils/administration/common';
import { fetchAllBrands } from '../../../../http/deviceAPI';


const ThAdminBrandsTooltip = ({ data, innerRef, setSearchParams }) => {
    const { toolTip, brands } = useContext(Context);

    const onThClickHandler = async(data) => {
        const cb = async() => await fetchAll(fetchAllBrands, null, brands.sortBy, brands.sortDirection);
        const flags = { setLoading: true, setPageTotal: false};
        onSortTableClickHandler(cb, data, brands, toolTip, flags, setSearchParams);
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

export default withTooltip(ThAdminBrandsTooltip);