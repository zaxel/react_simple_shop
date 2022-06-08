import React, { useRef } from 'react';
// import TdDelete from '../../users/tableComponents/TdDelete';
// import TdInputNumber from '../../users/tableComponents/TdInputNumber';
// import TdIsActivatedSelect from '../../users/tableComponents/TdIsActivatedSelect';
// import TdModalLink from '../../users/tableComponents/TdModalLink';
// import TdUserRoleSelect from '../../users/tableComponents/TdUserRoleSelect';
// import { adminPageFormatDate } from '../../../utils/formatDate';
import { adminPageFormatDate } from '../../../../utils/formatDate';



const TrOrders = ({ data }) => {
    console.log(data)
    let tdRefs = useRef([]);

    let ref0 = (el) => (tdRefs.current[0] = el);
    let toolTipInfo0 = {i:0, myRefs: tdRefs, text: 'edit email'};

    let ref1 = (el) => (tdRefs.current[1] = el);
    let toolTipInfo1 = {i:1, myRefs: tdRefs, text: 'edit role'};

    let ref2 = (el) => (tdRefs.current[2] = el);
    let toolTipInfo2 = {i:2, myRefs: tdRefs, text: 'edit activated status'};

    let ref3 = (el) => (tdRefs.current[3] = el);
    let toolTipInfo3 = {i:3, myRefs: tdRefs, text: 'check order details'};

    let ref4 = (el) => (tdRefs.current[4] = el);
    let toolTipInfo4 = {i:4, myRefs: tdRefs, text: 'delete user'};


    return (
        <tr >
            <td>{data.id}</td>
            <td>{adminPageFormatDate(data.createdAt)}</td>
            <td>{data.ordered}</td>
            {/* <TdInputNumber toolTipInfo={toolTipInfo0} innerRef={ref0} data={{inputData: data.email, userId: data.id, dbFieldName: 'email'}}/> */}
            {/* <TdUserRoleSelect toolTipInfo={toolTipInfo1} innerRef={ref1} data={{inputData: data.role, userId: data.id, dbFieldName: 'role'}}/> */}
            {/* <TdIsActivatedSelect toolTipInfo={toolTipInfo2} innerRef={ref2} data={{inputData: data.isActivated.toString(), userId: data.id, dbFieldName: 'is_activated'}}/> */} 
            {/* <td>{adminPageFormatDate(data.createdAt)}</td>
            <TdModalLink toolTipInfo={toolTipInfo3} innerRef={ref3} data={data.onOrderClickHandler}/>
            <TdDelete toolTipInfo={toolTipInfo4} innerRef={ref4} data={{userId: data.id}}/> */}
        </tr>
    );
};

export default TrOrders;