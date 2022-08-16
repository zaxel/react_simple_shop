import React, { useEffect, useContext, useRef, useState } from 'react';
import { Context } from '../..';
import withTooltip from '../../hocs/withTooltip/withTooltip';
import { Spinner } from 'react-bootstrap';
import { strToBool } from '../../utils/dataFormat/convertTypes';
import { onTableCellClickHandler, onInputBlurHandler, onInputButtonBlurHandler, onInputButtonClickHandler } from '../../utils/eventHandlers/commonInputTableFieldsHandlers';

const TdSelectCommon = ({ data, innerRef }) => {
    const selectRef = useRef(null);
    const buttonRef = useRef(null);

    const {store, inputCb, inputData, id, dbFieldName, opt, initValue, withSelectToBool } = data;
    const { toolTip, cart, user } = useContext(Context);
    const [edit, setEdit] = useState(false);
    const [selectData, setSelectData] = useState(inputData);
    const [loading, setLoading] = useState(false);


    const onDivClickHandler = () => {
        onTableCellClickHandler(toolTip, setEdit);
    }

    const onInputBlur = (e) => {
        onInputBlurHandler(toolTip, setEdit, e, buttonRef, store, id, dbFieldName, withSelectToBool ? strToBool(selectData) : selectData);
    }

    const onButtonBlurHandler = () => {
        onInputButtonBlurHandler(toolTip, setEdit, store, id, dbFieldName, withSelectToBool ? strToBool(selectData) : selectData);
    }

    const onButtonClickHandler = async () => {
        const cb = inputCb.bind(this, id, dbFieldName, withSelectToBool ? strToBool(selectData) : selectData, cart, user);
        onInputButtonClickHandler(toolTip, setEdit, setLoading, cb, store, id, dbFieldName, withSelectToBool ? strToBool(selectData) : selectData);
    }
    
    const onSelectChange = (e) => {
        setSelectData(prev => e.target.value)
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
                ? <div className='td-active' onClick={onDivClickHandler}>{initValue}</div>
                : <div className='display-flex'>
                    <select autoFocus ref={selectRef} value={selectData} onChange={onSelectChange} onBlur={onInputBlur}>
                        {opt}
                    </select>
                    <button ref={buttonRef} onClick={onButtonClickHandler} onBlur={onButtonBlurHandler}>V</button>
                  </div>}
        </td>
    );
};

export default withTooltip(TdSelectCommon);