import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Context } from '../../../..';

const TdNewBrandsInput = observer(({ data }) => {

    const { brands } = useContext(Context);
    let input = brands.newBrands.find(field=>field.id===data.id)[data.dbFieldName];

    const onInputChange = (e) => {
        brands.setNewBrandsInput(data.id, data.dbFieldName, e.target.value);
    }

    return (
        <td>
            <input type='text' value={input} onChange={onInputChange} />
        </td>
    );
});

export default TdNewBrandsInput;