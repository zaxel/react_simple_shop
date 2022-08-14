﻿import React, { useEffect, useContext, useRef, useState } from 'react';
import { Context } from '../../../..';
import withTooltip from '../../../../hocs/withTooltip/withTooltip';
import { changeUserData } from '../../../../utils/administration/adminUsers';
import { Spinner } from 'react-bootstrap';
import { onTableCellClickHandler, onInputBlurHandler, onInputButtonBlurHandler, onInputButtonClickHandler } from '../../../../utils/eventHandlers/commonInputTableFieldsHandlers';

const TdInputText = ({ data, innerRef }) => {

    const inputRef = useRef(null);
    const buttonRef = useRef(null);

    const { inputData, userId, dbFieldName } = data;
    const { toolTip, users, cart, user } = useContext(Context);
    const [edit, setEdit] = useState(false);
    const [input, setInput] = useState(inputData);
    const [loading, setLoading] = useState(false);

    const onDivClickHandler = () => {
        onTableCellClickHandler(toolTip, setEdit);
    }
    const onInputBlur = (e) => {
        onInputBlurHandler(toolTip, setEdit, e, buttonRef, users, userId, dbFieldName, input);
    }
    const onButtonBlurHandler = () => {
        onInputButtonBlurHandler(toolTip, setEdit, users, userId, dbFieldName, input);
    }
    const onButtonClickHandler = () => {
        const cb = changeUserData.bind(this, userId, dbFieldName, input, cart, user);
        onInputButtonClickHandler(toolTip, setEdit, setLoading, cb, users, userId, dbFieldName, input);
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
                    <input ref={inputRef} autoFocus type='text' value={input} onChange={onInputChange} onBlur={onInputBlur} />
                    <button ref={buttonRef} onClick={onButtonClickHandler} onBlur={onButtonBlurHandler}>V</button>
                </div>}
        </td>
    );
};

export default withTooltip(TdInputText);