import React, { useEffect, useContext, useRef, useState } from 'react';
import { Context } from '../../../..';
import { changeUserData } from '../../../../utils/administration/adminUsers';
import TdSelectCommon from '../../../commonTable/TdSelectCommon';

const TdIsActivatedSelect = ({ data, ...rest }) => {

    const { users } = useContext(Context);
    const [initValue, setInitValue] = useState('');
    const opt = [];
    opt.push(<option key={1} value={'true'}>activated</option>);
    opt.push(<option key={2} value={'false'}>not activated</option>);
    
    data.store = users;
    data.inputCb = changeUserData;
    data.initValue = initValue;
    data.opt = opt;
    data.withSelectToBool = true; 

    const changeInit = () => {
        const init = data.inputData === 'true' ? 'activated' : 'not activated'
        setInitValue(init);
    }

    useEffect(()=>{
        changeInit();
    }, [users.users])

    return (
        <TdSelectCommon data={data} {...rest}/>
    );
};

export default TdIsActivatedSelect;