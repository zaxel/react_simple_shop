import React, { useContext, useEffect } from 'react';
import { Context } from '../../../../..';
import withTooltip from '../../../../../hocs/withTooltip/withTooltip';
import { useNavigate } from "react-router-dom";
import { ADMIN_ORDERS_ROUTE } from '../../../../../utils/consts';



const NavigationRowLink = ({ data, innerRef}) => {
    const { toolTip, orders } = useContext(Context);
    const { id } = data;
    let navigate = useNavigate();

    useEffect(() => {
        //   destroy all event listeners tooltips
        return () => toolTip?.hoverIntentDestroy();
    }, [])

    const onClickHandler = () => {
        toolTip.setIsToolTipShown(false);
        orders.setSearchBy('id');
        orders.setSearchByPrase(id);
        navigate(ADMIN_ORDERS_ROUTE);
    }

    return (
        <tr className='td-active' ref={innerRef} onClick={onClickHandler}> 
                <td >{data.id}</td>
                <td >{data.createdAt}</td>
                <td >{data.amountOrdered}</td>
                <td >{data.total}</td>
        </tr>

    );
};

export default withTooltip(NavigationRowLink);
