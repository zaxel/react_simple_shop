import React, { useEffect, useContext, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Context } from '../../..';
import withTooltip from '../../../hocs/withTooltip/withTooltip';

const TdIsActivatedSelect = ({ data, innerRef }) => {

    const { toolTip } = useContext(Context);
    const [edit, setEdit] = useState(false);
    const [selectData, setSelectData] = useState(data);




    const onDivClickHandler = () => {
        toolTip.setIsToolTipShown(false);
        toolTip.setIsAvailable(false);
        setEdit(true);
    }
    const onButtonClickHandler = () => {
        setEdit(false);
        toolTip.setIsAvailable(true);
    }
    const onSelectChange = (e) => {
        setSelectData(prev => e.target.value)
    }


    useEffect(() => {
        //   destroy all event listeners tooltips
        return () => toolTip?.hoverIntentDestroy();
    }, [])


    return (
        <td ref={innerRef}>
            {!edit
                ? <div className='td-active' onClick={onDivClickHandler}>{selectData === 'true' ? 'activated' : 'not activated'}</div>
                : <div className='display-flex'>
                    <select value={selectData} onChange={onSelectChange}>
                        <option value={'true'}>activated</option>
                        <option value={'false'}>not activated</option>
                    </select>
                    <button onClick={onButtonClickHandler}>V</button>
                  </div>}
                
        </td>
    );
};

// export default TdInputText;
export default withTooltip(TdIsActivatedSelect);