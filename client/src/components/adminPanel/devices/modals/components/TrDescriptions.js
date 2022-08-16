import React, { useRef } from 'react';
import TdDescriptionInputText from './TdDescriptionInputText';
import TdDelete from './TdDelete';
import { makeInnerRefs } from '../../../../../utils/toolTipServing/makeInnerRefs';

const TrDescriptions = ({ data }) => {
    let tdRefs = useRef([]);
    const tipsTitles = ['edit title', 'edit description', 'delete description'];
    const tipsRefs = makeInnerRefs(tipsTitles, tdRefs);

    return (
        <tr >
            <TdDescriptionInputText {...tipsRefs[0]} data={{inputData: data.title, id: data.id, deviceId: data.deviceId, dbFieldName: 'title'}}/>
            <TdDescriptionInputText {...tipsRefs[1]} data={{inputData: data.description, id: data.id, deviceId: data.deviceId, dbFieldName: 'description'}}/>
            <TdDelete {...tipsRefs[2]} data={{id: data.id}}/>
        </tr>
    );
};

export default TrDescriptions;