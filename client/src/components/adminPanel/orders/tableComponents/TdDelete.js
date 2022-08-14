import React, { useContext } from 'react';
import { Context } from '../../../..';
import { deleteOrder } from '../../../../utils/administration/adminOrders';
import TdDeleteCommon from '../../../commonTable/TdDeleteCommon';

const TdDelete = ({data, ...rest}) => {
    const { orders } = useContext(Context);
    data.store = orders;
    data.deleteCb = deleteOrder;

    return (
        <TdDeleteCommon data={data} {...rest}/>
    );
};
export default TdDelete;