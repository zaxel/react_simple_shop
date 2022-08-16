import React, { useRef } from 'react';
import NavigationLink from './NavigationLink';
import { formatUsCurrency } from '../../../../../utils/dataFormat/currencies';
import { makeInnerRefs } from '../../../../../utils/toolTipServing/makeInnerRefs';

const TrOrderDetails = ({ data }) => {
    let tdRefs = useRef([]);
    const tipsTitles = ['device details', 'device details'];
    const tipsRefs = makeInnerRefs(tipsTitles, tdRefs);

    return (
        <tr>
            <NavigationLink {...tipsRefs[0]} data={{linkText: data.deviceId, deviceId: data.deviceId}}/>
            <NavigationLink {...tipsRefs[1]} data={{linkText: data.name, deviceId: data.deviceId}}/>
            <td>{data.device_amount}</td>
            <td>{data.rate}</td>
            <td>{formatUsCurrency(data.price)}</td>
        </tr>

    );
};

export default TrOrderDetails;