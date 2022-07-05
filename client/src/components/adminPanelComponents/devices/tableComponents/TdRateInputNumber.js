import React, { useEffect, useContext, useRef, useState } from 'react';
import { Context } from '../../../..';
import withTooltip from '../../../../hocs/withTooltip/withTooltip';
import { changeDeviceData } from '../../../../utils/adminDevices';
import { Spinner } from 'react-bootstrap';
import { isDeviceStateChanged } from '../../../../utils/isStateChanged';
import { correctRateRange } from '../../../../utils/correctInputNumbers';

const TdRateInputNumber = ({ data, innerRef }) => {

    const inputRef = useRef(null);
    const buttonRef = useRef(null);

    const { inputData, deviceId, dbFieldName } = data;
    const { toolTip, adminDevices } = useContext(Context);
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
        if (isDeviceStateChanged(adminDevices, deviceId, dbFieldName, input)) {
            setLoading(true);
            await changeDeviceData(deviceId, dbFieldName, +input);
            setLoading(false);
            adminDevices.setUpdateDataTrigger(prev => !adminDevices.updateDataTrigger());
        }
        setEdit(false);
        toolTip.setIsAvailable(true);
    }

    const onInputChange = (e) => {
        setInput(prev => {
           return correctRateRange(e.target.value);
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
                    <input ref={inputRef} autoFocus type='number' min='0' max='5' step='0.1' value={input} onChange={onInputChange} onBlur={onInputBlurHandler} />
                    <button ref={buttonRef} onClick={onButtonClickHandler} onBlur={onButtonBlurHandler}>V</button>
                </div>}
        </td>
    );
};

export default withTooltip(TdRateInputNumber);