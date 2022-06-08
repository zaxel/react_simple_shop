import React, { useEffect, useContext, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Context } from '../../..';
import withTooltip from '../../../hocs/withTooltip/withTooltip';
import { changeUserData } from '../../../utils/adminUsers';
import { Spinner } from 'react-bootstrap';
import { isStateChanged } from '../../../utils/isStateChanged';

const TdInputNumber = ({ data, innerRef }) => {

    const {inputData, userId, dbFieldName } = data;
    const { toolTip, users } = useContext(Context);
    const [edit, setEdit] = useState(false);
    const [input, setInput] = useState(inputData);
    const [loading, setLoading] = useState(false);

    const onDivClickHandler = () => {
        toolTip.setIsToolTipShown(false);
        toolTip.setIsAvailable(false);
        setEdit(true);
    }
    

    const onButtonClickHandler = async() => {
        if(isStateChanged(users, userId, dbFieldName, input)){
            setLoading(true);
            await changeUserData(userId, dbFieldName, input);
            setLoading(false);
            users.setUpdateDataTrigger(prev=>!users.updateDataTrigger());
        }
        setEdit(false);
        toolTip.setIsAvailable(true);
    }
    const onInputChange = (e) => {
        setInput(prev => e.target.value)
    }

    useEffect(() => {
        //   destroy all event listeners tooltips
        return () => toolTip?.hoverIntentDestroy();
    }, [])

    if (loading) {
        return (
          <td className="td-spinner">
            <Spinner animation="border" />
          </td>
        )
      }
    return (
        <td ref={innerRef}>
            {!edit 
                ? <div className='td-active' onClick={onDivClickHandler}>{input}</div> 
                : <div className='display-flex'>
                    <input type='number' value={input} onChange={onInputChange} />
                    <button onClick={onButtonClickHandler}>V</button>
                  </div>}

        </td>
    );
};

export default withTooltip(TdInputNumber);