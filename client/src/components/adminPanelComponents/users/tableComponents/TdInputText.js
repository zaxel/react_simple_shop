﻿import React, { useEffect, useContext, useRef, useState } from 'react';
import { Context } from '../../../..';
import withTooltip from '../../../../hocs/withTooltip/withTooltip';
import { changeUserData } from '../../../../utils/adminUsers';
import { Spinner } from 'react-bootstrap';
import { isUserStateChanged } from '../../../../utils/isStateChanged';

const TdInputText = ({ data, innerRef }) => {

    const inputRef = useRef(null);
    const buttonRef = useRef(null);

    const { inputData, userId, dbFieldName } = data;
    const { toolTip, users, cart, user } = useContext(Context);
    const [edit, setEdit] = useState(false);
    const [input, setInput] = useState(inputData);
    const [loading, setLoading] = useState(false);

    const onDivClickHandler = () => {
        toolTip.setIsToolTipShown(false);
        toolTip.setIsAvailable(false);
        setEdit(true);
    }

    const onInputBlurHandler = (e) => {
        if (!(e.relatedTarget === buttonRef.current)) {
            setEdit(false);
            toolTip.setIsAvailable(true);
        }
    }

    const onButtonBlurHandler = (e) => {
        setEdit(false);
        toolTip.setIsAvailable(true);
    }

    const onButtonClickHandler = async () => {
        if (isUserStateChanged(users, userId, dbFieldName, input)) {
            setLoading(true);
            const { loggedOut, updatedData } = await changeUserData(userId, dbFieldName, input, cart, user);
            if (loggedOut) return;
            setLoading(false);
            users.setUpdateDataTrigger(prev => !users.updateDataTrigger());
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
                    <input ref={inputRef} autoFocus type='text' value={input} onChange={onInputChange} onBlur={onInputBlurHandler} />
                    <button ref={buttonRef} onClick={onButtonClickHandler} onBlur={onButtonBlurHandler}>V</button>
                </div>}
        </td>
    );
};

export default withTooltip(TdInputText);