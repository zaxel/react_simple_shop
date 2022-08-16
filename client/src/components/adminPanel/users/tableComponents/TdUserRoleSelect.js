import React, { useEffect, useContext, useState, useRef } from 'react';
import { Context } from '../../../..';
import withTooltip from '../../../../hocs/withTooltip/withTooltip';
import { changeUserData } from '../../../../utils/administration/adminUsers';
import TdSelectCommon from '../../../commonTable/TdSelectCommon';

const TdUserRoleSelect = ({ data, ...rest }) => {

    const { users } = useContext(Context);
    const [initValue, setInitValue] = useState('');
    const opt = [];
    opt.push(<option key={1} value={'ADMIN'}>ADMIN</option>);
    opt.push(<option key={2} value={'MODERATOR'}>MODERATOR</option>);
    opt.push(<option key={3} value={'USER'}>USER</option>);
    
    data.store = users;
    data.inputCb = changeUserData;
    data.initValue = initValue;
    data.opt = opt;

    const changeInit = () => {
        const init = data.inputData;
        setInitValue(init);
    }

    useEffect(()=>{
        changeInit();
    }, [users.users])

    return (
        <TdSelectCommon data={data} {...rest}/>
    );
};

export default withTooltip(TdUserRoleSelect);