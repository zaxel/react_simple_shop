import React, { useEffect, useContext, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Context } from '../../..';
import withTooltip from '../../../hocs/withTooltip/withTooltip';

const ThTooltip = ({ data, innerRef}) => {
    const { toolTip } = useContext(Context);

    const sortBackwards = useRef(false);

    const onThClickHandler = (data) => {
        toolTip.setIsToolTipShown(false);
        toolTip.setIsAvailable(false);
        alert(data +': ' + sortBackwards.current);
        
        sortBackwards.current = !sortBackwards.current;
        toolTip.setIsAvailable(true);
    }



    useEffect(() => {
        //   destroy all event listeners tooltips
        
        return () => {
            if(typeof toolTip.hoverIntentDestroy === 'function')
                return toolTip?.hoverIntentDestroy()
        };
    }, [])

    return (
        <th className={!data.sortBy ? 'no-before' : null} onClick={data.sortBy && onThClickHandler.bind(this, data.sortBy)} ref={innerRef}>{data.title}</th>
    );
};

export default withTooltip(ThTooltip);