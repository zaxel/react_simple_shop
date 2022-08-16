import React, { useRef } from 'react';
import TdInputText from './TdInputText';
import TdDelete from './TdDelete';
import { adminPageFormatDate } from '../../../../utils/dataFormat/formatDate';
import { makeInnerRefs } from '../../../../utils/toolTipServing/makeInnerRefs';


const TrTypes = ({ data }) => {
    let tdRefs = useRef([]);
    const tipsTitles = ['edit device type', 'delete device type'];
    const tipsRefs = makeInnerRefs(tipsTitles, tdRefs);

    return (
        <tr >
            <td>{data.id}</td>
            <TdInputText {...tipsRefs[0]} data={{inputData: data.name, id: data.id, dbFieldName: 'name'}}/>
            <td>{adminPageFormatDate(data.createdAt)}</td>
            <td>{adminPageFormatDate(data.updatedAt)}</td>
            <TdDelete {...tipsRefs[1]} data={{id: data.id}}/>
        </tr>
    );
};

export default TrTypes;