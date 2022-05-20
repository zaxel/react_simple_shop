﻿import React, { useEffect, useContext, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Context } from '../../..';
import withTooltip from '../../../hocs/withTooltip/withTooltip';

const TdInputText = ({ data, innerRef }) => {

    const { toolTip } = useContext(Context);
    const [edit, setEdit] = useState(false);
    const [inputData, setInputData] = useState(data);




    const onDivClickHandler = () => {
        toolTip.setIsToolTipShown(false);
        toolTip.setIsAvailable(false);
        setEdit(true);
    }
    const onButtonClickHandler = () => {
        setEdit(false);
        toolTip.setIsAvailable(true);
    }
    const onInputChange = (e) => {
        setInputData(prev => e.target.value)
    }


    useEffect(() => {
        //   destroy all event listeners tooltips
        return () => toolTip?.hoverIntentDestroy();
    }, [])



    return (
        <td ref={innerRef}>
            {!edit 
                ? <div className='td-active' onClick={onDivClickHandler}>{inputData}</div> 
                : <div className='display-flex'>
                    <input type='text' value={inputData} onChange={onInputChange} />
                    <button onClick={onButtonClickHandler}>V</button>
                  </div>}

        </td>
    );
};

// export default TdInputText;
export default withTooltip(TdInputText);