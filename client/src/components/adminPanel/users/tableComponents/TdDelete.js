import React, { useContext } from 'react';
import { Context } from '../../../..';
import { deleteUser } from '../../../../utils/administration/adminUsers';
import TdDeleteCommon from '../../../commonTable/TdDeleteCommon';

const TdDelete = ({data, ...rest}) => {
    const { users } = useContext(Context);
    data.store = users;
    data.deleteCb = deleteUser;

    return (
        <TdDeleteCommon data={data} {...rest}/>
    );
};
export default TdDelete;