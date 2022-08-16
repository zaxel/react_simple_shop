import React, { useEffect, useContext, useRef, useState } from 'react';
import { Context } from '../..';
import withTooltip from '../../hocs/withTooltip/withTooltip';
import { Spinner } from 'react-bootstrap';
import { onTableCellClickHandler, onInputBlurHandler, onInputButtonBlurHandler, onInputButtonClickHandler } from '../../utils/eventHandlers/commonInputTableFieldsHandlers';

const TdInputNumberCommon = ({ data, innerRef }) => {
    const inputRef = useRef(null);
    const buttonRef = useRef(null);
    const {store, inputCb, inputData, id, dbFieldName, numberInputAttributes, inpNumFormat, outNumFormat } = data;
    const { toolTip, cart, user } = useContext(Context);
    const [edit, setEdit] = useState(false);
    const [input, setInput] = useState(inputData);
    const [loading, setLoading] = useState(false);

    const onDivClickHandler = () => {
        onTableCellClickHandler(toolTip, setEdit);
    }
    const onInputBlur = (e) => {
        onInputBlurHandler(toolTip, setEdit, e, buttonRef, store, id, dbFieldName, input);
    }
    const onButtonBlurHandler = () => {
        onInputButtonBlurHandler(toolTip, setEdit, store, id, dbFieldName, input);
    }
    const onButtonClickHandler = () => {
        const cb = inputCb.bind(this, id, dbFieldName, input, cart, user);
        onInputButtonClickHandler(toolTip, setEdit, setLoading, cb, store, id, dbFieldName, input);
    }
    const onInputChange = (e) => {
        setInput(prev => inpNumFormat ? inpNumFormat(e.target.value) : e.target.value);
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
                ? <div className='td-active' onClick={onDivClickHandler}>{outNumFormat ? outNumFormat(input) : input}</div>
                : <div className='display-flex'>
                    <input ref={inputRef} autoFocus type='number' {...numberInputAttributes} value={input} onChange={onInputChange} onBlur={onInputBlur} />
                    <button ref={buttonRef} onClick={onButtonClickHandler} onBlur={onButtonBlurHandler}>V</button>
                </div>}
        </td>
    );
};

export default withTooltip(TdInputNumberCommon);