import React, { useContext } from 'react';
import { Context } from '../../../..';
import { changeBrandData } from '../../../../utils/administration/adminBrands';
import TdInputTextCommon from '../../../commonTable/TdInputTextCommon';
const TdInputText = ({ data, ...rest }) => {

    const { brands } = useContext(Context);
    data.store = brands;
    data.inputCb = changeBrandData;

    return (
        <TdInputTextCommon data={data} {...rest}/>
    );
};

export default TdInputText;