import React from 'react';
import { v4 as uuidv4 } from 'uuid';


const TrTable = ({data, onRowClickHandler}) => {
    return (
        <tr onClick={onRowClickHandler}>
            {data.map(tds=>{
                const key = uuidv4();
                return <td key={key}>{tds}</td>
            })}
        </tr>
    );
};

export default TrTable;