import React, { useRef } from 'react';
import TdInputText from './TdInputText';
import TdModalLink from './TdModalLink';
import TdDelete from './TdDelete';
import { adminPageFormatDate } from '../../../../utils/formatDate';



const TrOrders = ({ data }) => {
    let tdRefs = useRef([]);

    let ref0 = (el) => (tdRefs.current[0] = el);
    let toolTipInfo0 = {i:0, myRefs: tdRefs, text: 'edit email'};

    let ref1 = (el) => (tdRefs.current[1] = el);
    let toolTipInfo1 = {i:1, myRefs: tdRefs, text: 'check order details'};

    let ref2 = (el) => (tdRefs.current[2] = el);
    let toolTipInfo2 = {i:2, myRefs: tdRefs, text: 'delete order'};


    return (
        <tr >
            <td>{data.id}</td>
            <td>{adminPageFormatDate(data.createdAt)}</td>
            <td>{data.ordered}</td>
            <td>{data.userId}</td>
            <td>{data.email}</td>
            <TdModalLink toolTipInfo={toolTipInfo1} innerRef={ref1} data={data.onOrderClickHandler}/>
            <TdDelete toolTipInfo={toolTipInfo2} innerRef={ref2} data={{orderId: data.id}}/>
        </tr>
    );
};

export default TrOrders;