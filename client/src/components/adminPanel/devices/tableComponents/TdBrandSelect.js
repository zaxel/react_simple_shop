import React, { useEffect, useContext, useState } from 'react';
import { Context } from '../../../..';
import { changeDeviceData } from '../../../../utils/administration/adminDevices';
import TdSelectCommon from '../../../commonTable/TdSelectCommon';

const TdBrandSelect = ({ data, ...rest }) => {
    const { adminDevices } = useContext(Context);
    const [initValue, setInitValue] = useState('');
    const opt = adminDevices.brands.map(option=><option key={option.id} value={option.id}>{option.name.toLowerCase()}</option>)
    
    data.store = adminDevices;
    data.inputCb = changeDeviceData;
    data.initValue = initValue;
    data.opt = opt;

    const changeInit = () => {
        const init = adminDevices.brands.find(op=>op.id===data.inputData).name;
        setInitValue(init);
    }

    useEffect(()=>{
        if(adminDevices.brands.length){
        changeInit();
        }
    }, [adminDevices.brands])

    return (
        <TdSelectCommon data={data} {...rest}/>
    );
};

export default TdBrandSelect;