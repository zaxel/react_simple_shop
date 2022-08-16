import React, { useRef } from 'react';
import TdNameInputText from './TdNameInputText';
import TdPriceInputNumber from './TdPriceInputNumber';
import TdRateInputNumber from './TdRateInputNumber';
import TdImgInputFile from './TdImgInputFile';
import TdTypeSelect from './TdTypeSelect';
import TdBrandSelect from './TdBrandSelect';
import TdDescriptionLink from './TdDescriptionLink';
import TdDelete from './TdDelete';
import { adminPageFormatDate } from '../../../../utils/dataFormat/formatDate';

const TrDevices = ({ data }) => {
    let tdRefs = useRef([]);

    let ref0 = (el) => (tdRefs.current[0] = el);
    let toolTipInfo0 = {i:0, myRefs: tdRefs, text: 'edit title'};

    let ref1 = (el) => (tdRefs.current[1] = el);
    let toolTipInfo1 = {i:1, myRefs: tdRefs, text: 'edit device price'};

    let ref2 = (el) => (tdRefs.current[2] = el);
    let toolTipInfo2 = {i:2, myRefs: tdRefs, text: 'edit device rate'};

    let ref3 = (el) => (tdRefs.current[3] = el);
    let toolTipInfo3 = {i:3, myRefs: tdRefs, text: 'image administration'};

    let ref4 = (el) => (tdRefs.current[4] = el);
    let toolTipInfo4 = {i:4, myRefs: tdRefs, text: 'edit device type'};
    
    let ref5 = (el) => (tdRefs.current[5] = el);
    let toolTipInfo5 = {i:5, myRefs: tdRefs, text: 'edit device brand'};
    
    let ref6 = (el) => (tdRefs.current[6] = el);
    let toolTipInfo6 = {i:6, myRefs: tdRefs, text: 'edit device descriptions'};
    
    let ref7 = (el) => (tdRefs.current[7] = el);
    let toolTipInfo7 = {i:7, myRefs: tdRefs, text: 'delete device'};

    return (
        <tr >
            <td>{data.id}</td>
            <TdNameInputText toolTipInfo={toolTipInfo0} innerRef={ref0} data={{inputData: data.name, id: data.id, dbFieldName: 'name'}}/>
            <TdPriceInputNumber toolTipInfo={toolTipInfo1} innerRef={ref1} data={{inputData: data.price, id: data.id, dbFieldName: 'price'}}/>
            <TdRateInputNumber toolTipInfo={toolTipInfo2} innerRef={ref2} data={{inputData: data.rate, id: data.id, dbFieldName: 'rate'}}/>
            <TdImgInputFile toolTipInfo={toolTipInfo3} innerRef={ref3} data={{inputData: {src: data.img, alt: data.name}, deviceId: data.id, dbFieldName: 'img'}}/>
            <td>{adminPageFormatDate(Date.parse(data.createdAt))}</td>
            <TdTypeSelect toolTipInfo={toolTipInfo4} innerRef={ref4} data={{inputData: data.typeId, deviceId: data.id, dbFieldName: 'typeId'}}/>
            <TdBrandSelect toolTipInfo={toolTipInfo5} innerRef={ref5} data={{inputData: data.brandId, deviceId: data.id, dbFieldName: 'brandId'}}/>
            <TdDescriptionLink toolTipInfo={toolTipInfo6} innerRef={ref6} data={{onDescriptionClickHandler:data.onDescriptionClickHandler, name: data.name}}/>
            <TdDelete toolTipInfo={toolTipInfo7} innerRef={ref7} data={{id: data.id}}/>
        </tr>
    );
};

export default TrDevices;