import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Context } from '../../../..';

const TdNewTypesInput = observer(({ data }) => {

    const { types } = useContext(Context);
    let input = types.newTypes.find(field=>field.id===data.id)[data.dbFieldName];

    const onInputChange = (e) => {
        types.setNewTypesInput(data.id, data.dbFieldName, e.target.value);
    }

    return (
        <td>
            <input type='text' value={input} onChange={onInputChange} />
        </td>
    );
});

export default TdNewTypesInput;