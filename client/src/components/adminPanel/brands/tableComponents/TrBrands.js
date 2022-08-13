import React, { useRef } from 'react';
import TdInputText from './TdInputText';
import TdDelete from './TdDelete';
import { adminPageFormatDate } from '../../../../utils/dataFormat/formatDate';



const TrBrands = ({ data }) => {
    let tdRefs = useRef([]);

    let ref0 = (el) => (tdRefs.current[0] = el);
    let toolTipInfo0 = {i:0, myRefs: tdRefs, text: 'edit device brand'};

    let ref1 = (el) => (tdRefs.current[1] = el);
    let toolTipInfo1 = {i:1, myRefs: tdRefs, text: 'delete device brand'};


    return (
        <tr >
            <td>{data.id}</td>
            <TdInputText toolTipInfo={toolTipInfo0} innerRef={ref0} data={{inputData: data.name, id: data.id, dbFieldName: 'name'}}/>
            <td>{adminPageFormatDate(data.createdAt)}</td>
            <td>{adminPageFormatDate(data.updatedAt)}</td>
            <TdDelete toolTipInfo={toolTipInfo1} innerRef={ref1} data={{id: data.id}}/>
        </tr>
    );
};

export default TrBrands;