import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Context } from '../../../../..';

const TdDescrNewInfoInput = observer(({ data }) => {

    const { adminDevicesInfo } = useContext(Context);
    let input = adminDevicesInfo._newInfo.find(field=>field.id===data.id)[data.dbFieldName];

    const onInputChange = (e) => {
        adminDevicesInfo.setNewInfoInput(data.id, data.dbFieldName, e.target.value);
    }

    return (
        <td>
            <input type='text' value={input} onChange={onInputChange} />
        </td>
    );
});

export default TdDescrNewInfoInput;