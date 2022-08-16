import React, { useEffect, useContext, useState, useRef } from 'react';
import { Context } from '../../../..';
import { changeDeviceData } from '../../../../utils/administration/adminDevices';
import TdSelectCommon from '../../../commonTable/TdSelectCommon';

const TdTypeSelect = ({ data, ...rest }) => {
    const { adminDevices } = useContext(Context);
    const [initValue, setInitValue] = useState('');
    const opt = adminDevices.types.map(option=><option key={option.id} value={option.id}>{option.name.toLowerCase()}</option>)
    
    data.store = adminDevices;
    data.inputCb = changeDeviceData;
    data.initValue = initValue;
    data.opt = opt;

    const changeInit = () => {
        const init = adminDevices.types.find(op=>op.id===data.inputData).name;
        setInitValue(init);
    }

    useEffect(()=>{
        if(adminDevices.types.length){
        changeInit();
        }
    }, [adminDevices.types])

    return (
        <TdSelectCommon data={data} {...rest}/>
    );
};

export default TdTypeSelect;