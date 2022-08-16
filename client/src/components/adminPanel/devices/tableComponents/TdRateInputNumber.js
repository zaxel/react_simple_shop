import React, { useContext } from 'react';
import { Context } from '../../../..';
import withTooltip from '../../../../hocs/withTooltip/withTooltip';
import { changeDeviceData } from '../../../../utils/administration/adminDevices';
import { correctRateRange } from '../../../../utils/dataFormat/correctInputNumbers';
import TdInputNumberCommon from '../../../commonTable/TdInputNumberCommon';

const TdRateInputNumber = ({ data, ...rest }) => {
    const { adminDevices } = useContext(Context);
    data.store = adminDevices;
    data.inputCb = changeDeviceData;
    data.numberInputAttributes = {step: '.1', min: '0', max: '5'};
    data.inpNumFormat = correctRateRange;

    return (
        <TdInputNumberCommon data={data} {...rest}/>
    );
};

export default withTooltip(TdRateInputNumber);