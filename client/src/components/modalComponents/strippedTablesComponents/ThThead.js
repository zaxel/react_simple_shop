import React from 'react';
import { v4 as uuidv4 } from 'uuid';

const ThThead = ({data}) => {
    return (
        <tr>
            {data.map(th=>{
                const key = uuidv4();
                return <th key={key}>{th}</th>
            })}
        </tr>
    );
};

export default ThThead;