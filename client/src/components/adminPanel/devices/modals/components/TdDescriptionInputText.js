import React, { useEffect, useContext, useRef, useState } from 'react';
import { Context } from '../../../../..';
import withTooltip from '../../../../../hocs/withTooltip/withTooltip';
import { changeDeviceInfo } from '../../../../../utils/administration/adminDeviceInfo';
import { Spinner } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { onTableCellClickHandler, onInputBlurHandler, onInputButtonBlurHandler, onClickNoReloadHandler } from '../../../../../utils/eventHandlers/commonInputTableFieldsHandlers';

const TdDescriptionInputText = observer(({ data, innerRef }) => {
    const inputRef = useRef(null);
    const buttonRef = useRef(null);

    const { inputData, id, dbFieldName } = data;
    const { toolTip, adminDevicesInfo, user, cart } = useContext(Context);
    const [edit, setEdit] = useState(false);
    const [input, setInput] = useState(inputData);
    const [loading, setLoading] = useState(false);

    const onDivClickHandler = () => {
        onTableCellClickHandler(toolTip, setEdit);
    }

    const onInputBlur = (e) => {
        onInputBlurHandler(toolTip, setEdit, e, buttonRef, adminDevicesInfo, id, dbFieldName, input);
    }

    const onButtonBlurHandler = () => {
        onInputButtonBlurHandler(toolTip, setEdit, adminDevicesInfo, id, dbFieldName, input);
    }

    const onButtonClickHandler = async () => {
        const cb = changeDeviceInfo.bind(this, id, dbFieldName, input, cart, user);
        onClickNoReloadHandler(toolTip, setEdit, setLoading, cb, adminDevicesInfo, id, dbFieldName, input);
        
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
});

export default withTooltip(TdDescriptionInputText);