import React, { useEffect, useContext, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Context } from '../../..';
import withTooltip from '../../../hocs/withTooltip/withTooltip';

const TdInputText = ({data, innerRef}) => {

    const { toolTip } = useContext(Context);





    const onClickHandler = () => {
        toolTip.setIsToolTipShown(false);
        toolTip.setIsAvailable(false);
        alert('click');
        
        toolTip.setIsAvailable(true);
    }



    useEffect(() => {
        //   destroy all event listeners tooltips
        return () => toolTip?.hoverIntentDestroy();
    }, [])



    return (
        <td ref={innerRef} onClick={onClickHandler} className='td-active'>
            {data}
        </td>
    );
};

// export default TdInputText;
export default withTooltip(TdInputText);