import React, {useRef} from 'react';
import { v4 as uuidv4 } from 'uuid';
import withTooltip from '../../../hocs/withTooltip';

const ThTable = ({data, innerRef}) => {
    return (
        <th ref={innerRef}>{data}</th>
    );
};

export default withTooltip(ThTable);