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
import { makeInnerRefs } from '../../../../utils/toolTipServing/makeInnerRefs';
import TdSellerDscrLink from './TdSellerDscrLink';

const TrDevices = ({ data }) => {
    let tdRefs = useRef([]);
    const tipsTitles = [
        'edit title', 
        'edit device price',
        'edit device rate',
        'image administration',
        'edit device type',
        'edit device brand',
        'edit device seller description',
        'edit device specifications',
        'delete device',
    ];
    const tipsRefs = makeInnerRefs(tipsTitles, tdRefs);

    return (
        <tr >
            <td>{data.id}</td>
            <TdNameInputText {...tipsRefs[0]} data={{inputData: data.name, id: data.id, dbFieldName: 'name'}}/>
            <TdPriceInputNumber {...tipsRefs[1]} data={{inputData: data.price, id: data.id, dbFieldName: 'price'}}/>
            <TdRateInputNumber {...tipsRefs[2]} data={{inputData: data.rate, id: data.id, dbFieldName: 'rate'}}/>
            <TdImgInputFile {...tipsRefs[3]} data={{inputData: {src: data.img, alt: data.name}, deviceId: data.id, dbFieldName: 'img'}}/>
            <td>{adminPageFormatDate(Date.parse(data.createdAt))}</td>
            <TdTypeSelect {...tipsRefs[4]} data={{inputData: data.typeId, id: data.id, dbFieldName: 'typeId'}}/>
            <TdBrandSelect {...tipsRefs[5]} data={{inputData: data.brandId, id: data.id, dbFieldName: 'brandId'}}/>
            
            <TdSellerDscrLink {...tipsRefs[6]} data={{inputData: data.seller_dscr, id: data.id, onSellerDscrClickHandler:data.onSellerDscrClickHandler, dbFieldName: 'seller_dscr'}}/>

            <TdDescriptionLink {...tipsRefs[7]} data={{onDescriptionClickHandler:data.onDescriptionClickHandler, name: data.name}}/>
            <TdDelete {...tipsRefs[8]} data={{id: data.id}}/>
        </tr>
    );
};

export default TrDevices;