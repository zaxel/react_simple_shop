import React, { useEffect, useContext, useState } from 'react';
import { Context } from '../../../..';
import withTooltip from '../../../../hocs/withTooltip/withTooltip';
import { changeTypeData } from '../../../../utils/adminTypes';
import { Spinner } from 'react-bootstrap';
import { isOrderStateChanged } from '../../../../utils/isStateChanged';

const TdInputText = ({ data, innerRef }) => {

    const {inputData, id, dbFieldName } = data;
    const { toolTip, types } = useContext(Context);
    const [edit, setEdit] = useState(false);
    const [input, setInput] = useState(inputData);
    const [loading, setLoading] = useState(false);

    const onDivClickHandler = () => {
        toolTip.setIsToolTipShown(false);
        toolTip.setIsAvailable(false);
        setEdit(true);
    }
    

    const onButtonClickHandler = async() => {
        if(isOrderStateChanged(types, id, dbFieldName, input)){
            setLoading(true);
            await changeTypeData(id, input);
            setLoading(false);
            types.setUpdateDataTrigger(prev=>!types.updateDataTrigger());
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
                    <input type='text' value={input} onChange={onInputChange} />
                    <button onClick={onButtonClickHandler}>V</button>
                  </div>}

        </td>
    );
};

export default withTooltip(TdInputText);