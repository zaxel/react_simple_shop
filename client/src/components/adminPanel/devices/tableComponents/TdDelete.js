import React, { useContext } from 'react';
import { Context } from '../../../..';
import TdDeleteCommon from '../../../commonTable/TdDeleteCommon';
import { deleteDevice } from '../../../../utils/administration/adminDevices';

const TdDelete = ({data, ...rest}) => {
    const { adminDevices } = useContext(Context);
    data.store = adminDevices;
    data.deleteCb = deleteDevice;

    return (
        <TdDeleteCommon data={data} {...rest}/>
    );
};
export default TdDelete;
