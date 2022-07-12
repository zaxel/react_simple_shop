import React, { useRef } from 'react';
import TdDescrNewInfoInput from './TdDescrNewInfoInput';
import TdDescrNewInfoDelete from './TdDescrNewInfoDelete';

const TrDescNewLine = ({ data }) => {
    
    return (
        <tr >
            <TdDescrNewInfoInput data={{id: data.id, dbFieldName: 'title'}}/>
            <TdDescrNewInfoInput data={{id: data.id, dbFieldName: 'description'}}/>
            <TdDescrNewInfoDelete data={{id: data.id, dropNewLine: data.dropNewLine}}/>
        </tr>
    );
};

export default TrDescNewLine;