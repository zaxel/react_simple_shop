import React, { useEffect, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import withTooltip from '../../../hocs/withTooltip/withTooltip';
import { Context } from '../../..';

const ThTable = ({ data, innerRef }) => {
    const { toolTip } = useContext(Context);

    useEffect(() => {
        //   destroy all event listeners tooltips
        return () => toolTip?.hoverIntentDestroy();
    }, [])

    return (
        <th ref={innerRef}>{data}</th>
    );
};

export default withTooltip(ThTable);