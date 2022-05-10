import React, {useEffect} from 'react';
import { v4 as uuidv4 } from 'uuid';
import withTooltip from '../../../hocs/withTooltip';


const TrTable =  ({data, onRowClickHandler, innerRef}) => {
    return (
        <tr ref={innerRef} onClick={onRowClickHandler}>
            {data.map(tds=>{
                const key = uuidv4();
                return <td key={key}>{tds}</td>
            })}
        </tr>
    );
};

export default withTooltip(TrTable);
// export default TrTable;