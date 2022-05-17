import React, {useEffect, useContext} from 'react';
import { v4 as uuidv4 } from 'uuid';
import withTooltip from '../../hocs/withTooltip/withTooltip';
import { Context } from '../..';

const TrTable =  ({data, onRowClickHandler, innerRef}) => {
    const { toolTip } = useContext(Context);

    useEffect(() => {
        //   destroy all event listeners tooltips
        return () => toolTip?.hoverIntentDestroy();
    }, [])

    return (
        // <tr ref={innerRef} >
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