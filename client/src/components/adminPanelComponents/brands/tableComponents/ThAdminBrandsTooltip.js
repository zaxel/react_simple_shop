import React, { useEffect, useContext, useRef } from 'react';
import { Context } from '../../../..';
import withTooltip from '../../../../hocs/withTooltip/withTooltip';
import { fetchAllBrands } from '../../../../utils/adminBrands';

const ThAdminBrandsTooltip = ({ data, innerRef}) => {
    const { toolTip, brands } = useContext(Context);

    const onThClickHandler = async(data) => {
        brands.setLoading(true);
        toolTip.setIsToolTipShown(false);
        toolTip.setIsAvailable(false);
        if(brands.sortBy === data){
            brands.sortDirection === 'ASC' ? brands.setSortDirection('DESC') : brands.setSortDirection('ASC');
        }else{
            brands.setSortDirection('ASC');
        }
        brands.setSortBy(data);
        await fetchAllBrands(brands, brands.sortBy, brands.sortDirection);
        brands.setLoading(false);
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

export default withTooltip(ThAdminBrandsTooltip);