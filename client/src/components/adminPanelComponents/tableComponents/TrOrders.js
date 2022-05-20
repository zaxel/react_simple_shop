import React, { useContext, useEffect } from 'react';
import { Context } from '../../..';
import { v4 as uuidv4 } from 'uuid';


const TrOrders = ({ data, onRowClickHandler, innerRef}) => {
    const { toolTip } = useContext(Context);

    useEffect(() => {
        //   destroy all event listeners tooltips
        return () => toolTip?.hoverIntentDestroy();
    }, [])



    return (
        // <tr ref={innerRef} >
        <tr className='td-active' ref={innerRef} onClick={onRowClickHandler}> 
            {data.map(tds=>{
                const key = uuidv4();
                return <td key={key}>{tds}</td>
            })}
        </tr>

    );
};

export default TrOrders;