import React, { useRef } from 'react';
import NavigationLink from './NavigationLink';
import { formatUsCurrency } from '../../../../../utils/dataFormat/currencies';

const TrOrderDetails = ({ data }) => {
    let tdRefs = useRef([]);

    let ref0 = (el) => (tdRefs.current[0] = el);
    let toolTipInfo0 = {i:0, myRefs: tdRefs, text: 'device details'};

    let ref1 = (el) => (tdRefs.current[1] = el);
    let toolTipInfo1 = {i:1, myRefs: tdRefs, text: 'device details'};

    return (
        <tr>
            <NavigationLink toolTipInfo={toolTipInfo0} innerRef={ref0} data={{linkText: data.deviceId, deviceId: data.deviceId}}/>
            <NavigationLink toolTipInfo={toolTipInfo1} innerRef={ref1} data={{linkText: data.name, deviceId: data.deviceId}}/>
            <td>{data.device_amount}</td>
            <td>{data.rate}</td>
            <td>{formatUsCurrency(data.price)}</td>
        </tr>

    );
};

export default TrOrderDetails;