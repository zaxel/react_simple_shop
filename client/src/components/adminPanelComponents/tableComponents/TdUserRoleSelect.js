import React, { useEffect, useContext, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Context } from '../../..';
import withTooltip from '../../../hocs/withTooltip/withTooltip';

const TdUserRoleSelect = ({ data, innerRef }) => {

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
                ? <div className='td-active' onClick={onDivClickHandler}>{selectData}</div>
                : <div className='display-flex'>
                    <select value={selectData} onChange={onSelectChange}>
                        <option value="ADMIN">ADMIN</option>
                        <option value="MODERATOR">MODERATOR</option>
                        <option value="USER">USER</option>
                    </select>
                    <button onClick={onButtonClickHandler}>V</button>
                  </div>}
                
                
                
                

        </td>
    );
};

// export default TdInputText;
export default withTooltip(TdUserRoleSelect);