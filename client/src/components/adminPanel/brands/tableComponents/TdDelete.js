import React, { useContext } from 'react';
import { Context } from '../../../..';
import { deleteBrand } from '../../../../utils/administration/adminBrands';
import TdDeleteCommon from '../../../commonTable/TdDeleteCommon';

const TdDelete = ({data, ...rest}) => {
    const { brands } = useContext(Context);
    data.store = brands;
    data.deleteCb = deleteBrand;

    return (
        <TdDeleteCommon data={data} {...rest}/>
    );
};

export default TdDelete;