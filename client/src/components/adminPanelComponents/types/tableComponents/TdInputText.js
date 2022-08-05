import React, { useEffect, useContext, useState, useRef } from 'react';
import { Context } from '../../../..';
import withTooltip from '../../../../hocs/withTooltip/withTooltip';
import { changeTypeData } from '../../../../utils/adminTypes';
import { Spinner } from 'react-bootstrap';
import { onTableCellClickHandler, onInputBlurHandler, onInputButtonBlurHandler, onClickNoReloadHandler } from '../../../../utils/eventHandlers/commonInputTableFieldsHandlers';

const TdInputText = ({ data, innerRef }) => {

    const inputRef = useRef(null);
    const buttonRef = useRef(null);

    const {inputData, id, dbFieldName } = data;
    const { toolTip, types, cart, user } = useContext(Context);
    const [edit, setEdit] = useState(false);
    const [input, setInput] = useState(inputData);
    const [loading, setLoading] = useState(false);

    const onDivClickHandler = () => {
        onTableCellClickHandler(toolTip, setEdit);
    }

    const onInputBlur = (e) => {
        onInputBlurHandler(toolTip, setEdit, e, buttonRef, types, id, dbFieldName, input);
    }

    const onButtonBlurHandler = () => {
        onInputButtonBlurHandler(toolTip, setEdit, types, id, dbFieldName, input);
    }

    const onButtonClickHandler = async () => {
        const cb = changeTypeData.bind(this, id, input, cart, user);
        onClickNoReloadHandler(toolTip, setEdit, setLoading, cb, types, id, dbFieldName, input);
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
                    <input ref={inputRef} autoFocus type='text' value={input} onChange={onInputChange} onBlur={onInputBlur}/>
                    <button ref={buttonRef} onClick={onButtonClickHandler} onBlur={onButtonBlurHandler}>V</button>
                  </div>}

        </td>
    );
};

export default withTooltip(TdInputText);