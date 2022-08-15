import React, { useContext } from 'react';
import { Context } from '../../../..';
import { changeDeviceData } from '../../../../utils/administration/adminDevices';
import TdInputTextCommon from '../../../commonTable/TdInputTextCommon';

const TdNameInputText = ({ data, ...rest }) => {

    const { adminDevices } = useContext(Context);
    data.store = adminDevices;
    data.inputCb = changeDeviceData;

    return (
        <TdInputTextCommon data={data} {...rest}/>
    );
};

export default TdNameInputText;