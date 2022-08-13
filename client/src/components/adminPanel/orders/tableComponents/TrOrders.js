import React, { useRef } from 'react';
import TdModalLink from './TdModalLink';
import TdDelete from './TdDelete';
import { adminPageFormatDate } from '../../../../utils/dataFormat/formatDate';
import { formatUsCurrency } from '../../../../utils/dataFormat/currencies';




const TrOrders = ({ data }) => {
    let tdRefs = useRef([]);
    
    let ref0 = (el) => (tdRefs.current[0] = el);
    let toolTipInfo0 = {i:0, myRefs: tdRefs, text: 'check order details'};

    let ref1 = (el) => (tdRefs.current[1] = el);
    let toolTipInfo1 = {i:1, myRefs: tdRefs, text: 'delete order'};


    return (
        <tr >
            <td>{data.id}</td>
            <td>{adminPageFormatDate(data.createdAt)}</td>
            <td>{data.amountOrdered}</td>
            <td>{data.userId}</td>
            <td>{data.email}</td>
            <td>{formatUsCurrency(data.total)}</td>
            <TdModalLink toolTipInfo={toolTipInfo0} innerRef={ref0} showOrderModal={data.onOrderClickHandler.bind(this, data.id)}/>
            <TdDelete toolTipInfo={toolTipInfo1} innerRef={ref1} data={{orderId: data.id}}/>
        </tr>
    );
};

export default TrOrders;