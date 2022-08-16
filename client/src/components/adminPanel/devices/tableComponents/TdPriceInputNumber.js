import React, { useContext } from 'react';
import { Context } from '../../../..';
import { changeDeviceData } from '../../../../utils/administration/adminDevices';
import { correctPriceRange } from '../../../../utils/dataFormat/correctInputNumbers';
import TdInputNumberCommon from '../../../commonTable/TdInputNumberCommon';

const TdPriceInputNumber = ({ data, ...rest }) => {

    const { adminDevices } = useContext(Context);
    data.store = adminDevices;
    data.inputCb = changeDeviceData;
    data.numberInputAttributes = {step: '1'};
    data.correctNumberFormat = correctPriceRange;

    return (
        <TdInputNumberCommon data={data} {...rest}/>
    );
};

export default TdPriceInputNumber;