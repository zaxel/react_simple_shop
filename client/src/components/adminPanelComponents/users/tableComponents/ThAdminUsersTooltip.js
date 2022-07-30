import React, { useEffect, useContext, useRef } from 'react';
import { Context } from '../../../..';
import withTooltip from '../../../../hocs/withTooltip/withTooltip';
import { fetchPage } from '../../../../utils/adminUsers';

const ThAdminUsersTooltip = ({ data, innerRef}) => {
    const { toolTip, users, cart, user } = useContext(Context);

    const onThClickHandler = async(data) => {
        toolTip.setIsToolTipShown(false);
        toolTip.setIsAvailable(false);
        if(users.sortBy === data){
            users.sortDirection === 'ASC' ? users.setSortDirection('DESC') : users.setSortDirection('ASC');
        }else{
            users.setSortDirection('ASC');
        }
        users.setSortBy(data);
        await fetchPage(users, cart, user);
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

export default withTooltip(ThAdminUsersTooltip);