import React, { useEffect, useContext } from 'react';
import withTooltip from '../../../hocs/withTooltip/withTooltip';
import { Context } from '../../..';

const ThTable = ({ data, innerRef, onThClickHandler }) => {
    const { toolTip } = useContext(Context);

    useEffect(() => {
        //   destroy all event listeners tooltips
        return () => toolTip?.hoverIntentDestroy();
    }, [])

    return (
        <th className='td-active' onClick={onThClickHandler} ref={innerRef}>{data}</th>
    );
};

export default withTooltip(ThTable);