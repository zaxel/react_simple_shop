import React, { useRef } from 'react';
import TdDelete from './TdDelete';
import TdInputText from './TdInputText';
import TdIsActivatedSelect from './TdIsActivatedSelect';
import TdModalLink from './TdModalLink';
import TdUserRoleSelect from './TdUserRoleSelect';
import { adminPageFormatDate } from '../../../utils/adminPageFormatDate';


const TrUsers = ({ data }) => {
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
            <TdInputText toolTipInfo={toolTipInfo0} innerRef={ref0} data={{inputData: data.email, userId: data.id, dbFieldName: 'email'}}/>
            <TdUserRoleSelect toolTipInfo={toolTipInfo1} innerRef={ref1} data={{inputData: data.role, userId: data.id, dbFieldName: 'role'}}/>
            <TdIsActivatedSelect toolTipInfo={toolTipInfo2} innerRef={ref2} data={data.isActivated.toString()}/>
            <td>{adminPageFormatDate(data.createdAt)}</td>
            <TdModalLink toolTipInfo={toolTipInfo3} innerRef={ref3} data={data.onOrderClickHandler}/>
            <TdDelete toolTipInfo={toolTipInfo4} innerRef={ref4}/>
        </tr>
    );
};

export default TrUsers;