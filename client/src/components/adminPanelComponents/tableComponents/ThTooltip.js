import React, { useEffect, useContext, useRef } from 'react';
import { Context } from '../../..';
import withTooltip from '../../../hocs/withTooltip/withTooltip';
import { fetchAllUsers } from '../../../utils/adminUsers';

const ThTooltip = ({ data, innerRef}) => {
    const { toolTip, users } = useContext(Context);

    const onThClickHandler = async(data) => {
        users.setLoading(true);
        toolTip.setIsToolTipShown(false);
        toolTip.setIsAvailable(false);
        if(users.sortBy === data){
            users.sortDirection === 'ASC' ? users.setSortDirection('DESC') : users.setSortDirection('ASC');
        }else{
            users.setSortDirection('ASC');
        }
        users.setSortBy(data);
        await fetchAllUsers(users, users.sortBy, users.sortDirection, users.itemsPerPage, users.activePage, users.searchBy, users.searchByPrase);
        await users.setPagesTotal(Math.ceil(users.users.count/users.itemsPerPage));
        users.setLoading(false);
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

export default withTooltip(ThTooltip);