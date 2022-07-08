import React, { useRef } from 'react';
import TdDescriptionInputText from './TdDescriptionInputText';
import TdDelete from './TdDelete';

const TrDescriptions = ({ data }) => {
    let tdRefs = useRef([]);

    let ref0 = (el) => (tdRefs.current[0] = el);
    let toolTipInfo0 = {i:0, myRefs: tdRefs, text: 'edit title'};

    let ref1 = (el) => (tdRefs.current[1] = el);
    let toolTipInfo1 = {i:1, myRefs: tdRefs, text: 'edit description'};
    
    let ref2 = (el) => (tdRefs.current[2] = el);
    let toolTipInfo2 = {i:2, myRefs: tdRefs, text: 'delete description'};

    

    return (
        <tr >
            <TdDescriptionInputText toolTipInfo={toolTipInfo0} innerRef={ref0} data={{inputData: data.title, descriptionId: data.id, dbFieldName: 'title'}}/>
            <TdDescriptionInputText toolTipInfo={toolTipInfo1} innerRef={ref1} data={{inputData: data.description, descriptionId: data.id, dbFieldName: 'description'}}/>
            <TdDelete toolTipInfo={toolTipInfo2} innerRef={ref2} data={{descriptionId: data.id}}/>
        </tr>
    );
};

export default TrDescriptions;