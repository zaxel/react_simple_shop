import React, { useEffect, useContext, useRef, useState } from 'react';
import { Context } from '../../../../..';
import withTooltip from '../../../../../hocs/withTooltip/withTooltip';
import { changeDeviceInfo } from '../../../../../utils/adminDeviceInfo';
import { Spinner } from 'react-bootstrap';
import { isDeviceInfoStateChanged } from '../../../../../utils/isStateChanged';
import { observer } from 'mobx-react-lite';

const TdDescriptionInputText = observer(({ data, innerRef }) => {

    const inputRef = useRef(null);
    const buttonRef = useRef(null);

    const { inputData, infoId, deviceId, dbFieldName } = data;
    const { toolTip, adminDevicesInfo, user, cart } = useContext(Context);
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
        if (isDeviceInfoStateChanged(adminDevicesInfo, infoId, dbFieldName, input)) {
            setLoading(true);
            const {loggedOut} = await changeDeviceInfo(infoId, dbFieldName, input, cart, user)
            if(loggedOut)return;
            setLoading(false);
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
});

export default withTooltip(TdDescriptionInputText);