﻿import React, { useRef } from 'react';
import TdDelete from './TdDelete';
import TdInputText from './TdInputText';
import TdIsActivatedSelect from './TdIsActivatedSelect';
import TdModalLink from './TdModalLink';
import TdUserRoleSelect from './TdUserRoleSelect';



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
            <td>{data[0]}</td>
            <TdInputText toolTipInfo={toolTipInfo0} innerRef={ref0} data={data[1]}/>
            <TdUserRoleSelect toolTipInfo={toolTipInfo1} innerRef={ref1} data={data[2]}/>
            <TdIsActivatedSelect toolTipInfo={toolTipInfo2} innerRef={ref2} data={data[3]}/>
            <td>{data[4]}</td>
            <TdModalLink toolTipInfo={toolTipInfo3} innerRef={ref3}/>
            <TdDelete toolTipInfo={toolTipInfo4} innerRef={ref4}/>
        </tr>
    );
};

export default TrUsers;