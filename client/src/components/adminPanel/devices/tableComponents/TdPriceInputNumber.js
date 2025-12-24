import React, { useContext } from 'react';
import { Context } from '../../../..';
import { changeDeviceData } from '../../../../utils/administration/adminDevices';
import { correctPriceRange } from '../../../../utils/dataFormat/correctInputNumbers';
import TdInputNumberCommon from '../../../commonTable/TdInputNumberCommon';
import { formatUSCurrency } from '../../../../utils/dataFormat/currencies';

const TdPriceInputNumber = ({ data, ...rest }) => {

    const { adminDevices } = useContext(Context);
    data.store = adminDevices;
    data.inputCb = changeDeviceData;
    data.numberInputAttributes = {step: '1'};
    data.inpNumFormat = correctPriceRange;
    data.outNumFormat = formatUSCurrency;

    return (
        <TdInputNumberCommon data={data} {...rest}/>
    );
};

export default TdPriceInputNumber;