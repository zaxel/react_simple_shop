import React, { useContext } from 'react';
import { Context } from '../../../..';
import { changeUserData } from '../../../../utils/administration/adminUsers';
import TdInputTextCommon from '../../../commonTable/TdInputTextCommon';

const TdInputText = ({ data, ...rest}) => {
    const { users } = useContext(Context);
    data.store = users;
    data.inputCb = changeUserData;

    return (
        <TdInputTextCommon data={data} {...rest}/>
    );
};

export default TdInputText;