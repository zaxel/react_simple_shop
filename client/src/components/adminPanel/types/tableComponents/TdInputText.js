import React, { useContext } from 'react';
import { Context } from '../../../..';
import { changeTypeData } from '../../../../utils/administration/adminTypes';
import TdInputTextCommon from '../../../commonTable/TdInputTextCommon';

const TdInputText = ({ data, ...rest }) => {
    const { types } = useContext(Context);
    data.store = types;
    data.inputCb = changeTypeData;

    return (
        <TdInputTextCommon data={data} {...rest} />
    );
};

export default TdInputText;