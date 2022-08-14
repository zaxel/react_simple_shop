import React, { useContext } from 'react';
import { Context } from '../../../..';
import { deleteType } from '../../../../utils/administration/adminTypes';
import TdDeleteCommon from '../../../commonTable/TdDeleteCommon';

const TdDelete = ({data, ...rest}) => {
    const { types } = useContext(Context);
    data.store = types;
    data.deleteCb = deleteType;

    return (
        <TdDeleteCommon data={data} {...rest}/>
    );
};

export default TdDelete;