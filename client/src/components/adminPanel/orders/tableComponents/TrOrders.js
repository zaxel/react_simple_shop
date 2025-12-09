import React, { useRef } from 'react';
import TdModalLink from './TdModalLink';
import TdDelete from './TdDelete';
import { adminPageFormatDate } from '../../../../utils/dataFormat/formatDate';
import { formatGbCurrency } from '../../../../utils/dataFormat/currencies';
import { makeInnerRefs } from '../../../../utils/toolTipServing/makeInnerRefs';

const TrOrders = ({ data }) => {
    let tdRefs = useRef([]);
    const tipsTitles = ['check order details', 'delete order'];
    const tipsRefs = makeInnerRefs(tipsTitles, tdRefs);

    return (
        <tr >
            <td>{data.id}</td>
            <td>{adminPageFormatDate(data.createdAt)}</td>
            <td>{data.amountOrdered}</td>
            <td>{data.userId}</td>
            <td>{data.email}</td>
            <td>{formatGbCurrency(data.total)}</td>
            <TdModalLink {...tipsRefs[0]} showOrderModal={data.onOrderClickHandler.bind(this, data.id)}/>
            <TdDelete {...tipsRefs[1]} data={{id: data.id}}/>
        </tr>
    );
};

export default TrOrders;