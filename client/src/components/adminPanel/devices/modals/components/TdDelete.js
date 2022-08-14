import React, { useContext } from 'react';
import { Context } from '../../../../..';
import { deleteDeviceInfoLine } from '../../../../../utils/administration/adminDeviceInfo';
import TdDeleteCommon from '../../../../commonTable/TdDeleteCommon';

const TdDelete = ({data, ...rest}) => {
    const { adminDevicesInfo } = useContext(Context);
    data.store = adminDevicesInfo;
    data.deleteCb = deleteDeviceInfoLine;

    return (
        <TdDeleteCommon data={data} {...rest}/>
    );
};
export default TdDelete;