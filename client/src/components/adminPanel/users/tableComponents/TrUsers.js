import React, { useRef } from 'react';
import TdDelete from './TdDelete';
import TdInputText from './TdInputText';
import TdIsActivatedSelect from './TdIsActivatedSelect';
import TdModalLink from './TdModalLink';
import TdUserRoleSelect from './TdUserRoleSelect';
import { adminPageFormatDate } from '../../../../utils/dataFormat/formatDate';
import { makeInnerRefs } from '../../../../utils/toolTipServing/makeInnerRefs';

const TrUsers = ({ data }) => {
    let tdRefs = useRef([]);
    const tipsTitles = [
        'edit email', 
        'edit role',
        'edit activated status',
        'check order details',
        'delete user',
    ];
    const tipsRefs = makeInnerRefs(tipsTitles, tdRefs);

    return (
        <tr >
            <td>{data.id}</td>
            <TdInputText {...tipsRefs[0]} data={{inputData: data.email, id: data.id, dbFieldName: 'email'}}/>
            <TdUserRoleSelect {...tipsRefs[1]} data={{inputData: data.role, id: data.id, dbFieldName: 'role'}}/>
            <TdIsActivatedSelect {...tipsRefs[2]} data={{inputData: data.is_activated.toString(), id: data.id, dbFieldName: 'is_activated'}}/>
            <td>{adminPageFormatDate(data.createdAt)}</td>
            <TdModalLink {...tipsRefs[3]} data={data.onOrderClickHandler.bind(this, data.id)}/>
            <TdDelete {...tipsRefs[4]} data={{id: data.id}}/>
        </tr>
    );
};

export default TrUsers;