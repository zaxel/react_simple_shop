import React, { useEffect, useContext, useRef } from 'react';
import { Context } from '../../../..';
import withTooltip from '../../../../hocs/withTooltip/withTooltip';
import { fetchAllTypes } from '../../../../utils/adminTypes';

const ThAdminTypesTooltip = ({ data, innerRef}) => {
    const { toolTip, types } = useContext(Context);

    const onThClickHandler = async(data) => {
        types.setLoading(true);
        toolTip.setIsToolTipShown(false);
        toolTip.setIsAvailable(false);
        if(types.sortBy === data){
            types.sortDirection === 'ASC' ? types.setSortDirection('DESC') : types.setSortDirection('ASC');
        }else{
            types.setSortDirection('ASC');
        }
        types.setSortBy(data);
        await fetchAllTypes(types, types.sortBy, types.sortDirection);
        types.setLoading(false);
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

export default withTooltip(ThAdminTypesTooltip);