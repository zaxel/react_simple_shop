import React, { useEffect, useContext, useState, useRef } from 'react';
import { Context } from '../../../..';
import withTooltip from '../../../../hocs/withTooltip/withTooltip';
import { Spinner } from 'react-bootstrap';
import { changeDeviceData } from '../../../../utils/administration/adminDevices';
import { observer } from 'mobx-react-lite';
import { onTableCellClickHandler, onInputBlurHandler, onInputButtonBlurHandler, onInputButtonClickHandler } from '../../../../utils/eventHandlers/commonInputTableFieldsHandlers';

const TdTypeSelect = observer(({ data, innerRef }) => {
    

    const selectRef = useRef(null);
    const buttonRef = useRef(null);

    const {inputData, deviceId, dbFieldName } = data;
    const { toolTip, adminDevices, cart, user } = useContext(Context);
    const [edit, setEdit] = useState(false);
    const [selectData, setSelectData] = useState(inputData);
    const [initValue, setInitValue] = useState('');
    const [loading, setLoading] = useState(false);


    const onDivClickHandler = () => {
        onTableCellClickHandler(toolTip, setEdit);
    }

    const onInputBlur = (e) => {
        onInputBlurHandler(toolTip, setEdit, e, buttonRef, adminDevices, deviceId, dbFieldName, selectData);
    }

    const onButtonBlurHandler = () => {
        onInputButtonBlurHandler(toolTip, setEdit, adminDevices, deviceId, dbFieldName, selectData);
    }

    const onButtonClickHandler = async () => {
        const cb = changeDeviceData.bind(this, deviceId, dbFieldName, selectData, cart, user);
        onInputButtonClickHandler(toolTip, setEdit, setLoading, cb, adminDevices, deviceId, dbFieldName, selectData);
    }

    const onSelectChange = (e) => {
        setSelectData(prev => e.target.value)
    }

    const opt = adminDevices.types.map(option=><option key={option.id} value={option.id}>{option.name.toLowerCase()}</option>)
    const changeInit = () => {
        const init = adminDevices.types.find(op=>op.id===inputData).name;
        setInitValue(init);
    }

    useEffect(() => {
        setLoading(true);
        //   destroy all event listeners tooltips
        return () => toolTip?.hoverIntentDestroy();
    }, [])

    useEffect(()=>{
        if(adminDevices.types.length){
        changeInit();
        setLoading(false);
        }
    }, [adminDevices.types])
    

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
});

export default withTooltip(TdTypeSelect);