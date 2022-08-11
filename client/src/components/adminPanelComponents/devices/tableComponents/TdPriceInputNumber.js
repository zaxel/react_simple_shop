import React, { useEffect, useContext, useRef, useState } from 'react';
import { Context } from '../../../..';
import withTooltip from '../../../../hocs/withTooltip/withTooltip';
import { changeDeviceData } from '../../../../utils/adminDevices';
import { Spinner } from 'react-bootstrap';
import { correctPriceRange } from '../../../../utils/dataFormat/correctInputNumbers';
import { onInputBlurHandler, onTableCellClickHandler, onInputButtonBlurHandler, onInputButtonClickHandler} from '../../../../utils/eventHandlers/commonInputTableFieldsHandlers';

const TdPriceInputNumber = ({ data, innerRef }) => {

    const inputRef = useRef(null);
    const buttonRef = useRef(null);

    const { inputData, deviceId, dbFieldName } = data;
    const { toolTip, adminDevices, cart, user } = useContext(Context);
    const [edit, setEdit] = useState(false);
    const [input, setInput] = useState(inputData);
    const [loading, setLoading] = useState(false);

    const onDivClickHandler = () => {
        onTableCellClickHandler(toolTip, setEdit);
    }

    const onInputBlur = (e) => {
        onInputBlurHandler(toolTip, setEdit, e, buttonRef, adminDevices, deviceId, dbFieldName, input);
    }

    const onButtonBlurHandler = (e) => {
        onInputButtonBlurHandler(toolTip, setEdit, adminDevices, deviceId, dbFieldName, input);
    }

    const onButtonClickHandler = async () => {
        const cb = changeDeviceData.bind(this, deviceId, dbFieldName, +input, cart, user);
        onInputButtonClickHandler(toolTip, setEdit, setLoading, cb, adminDevices, deviceId, dbFieldName, input);
    }

    const onInputChange = (e) => {
        // setInput(prev => e.target.value)
        setInput(prev => {
            return correctPriceRange(e.target.value);
         })
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
                    <input ref={inputRef} autoFocus type='number' step='1' value={input} onChange={onInputChange} onBlur={onInputBlur} />
                    <button ref={buttonRef} onClick={onButtonClickHandler} onBlur={onButtonBlurHandler}>V</button>
                </div>}
        </td>
    );
};

export default withTooltip(TdPriceInputNumber);