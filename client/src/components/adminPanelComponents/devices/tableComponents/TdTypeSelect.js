import React, { useEffect, useContext, useState, useRef } from 'react';
import { Context } from '../../../..';
import withTooltip from '../../../../hocs/withTooltip/withTooltip';
import { isDeviceStateChanged } from '../../../../utils/isStateChanged';
import { Spinner } from 'react-bootstrap';
import { changeDeviceData } from '../../../../utils/adminDevices';
import { observer } from 'mobx-react-lite';

const TdTypeSelect = observer(({ data, innerRef }) => {
    

    const selectRef = useRef(null);
    const buttonRef = useRef(null);

    const {inputData, deviceId, dbFieldName } = data;
    const { toolTip, adminDevices } = useContext(Context);
    const [edit, setEdit] = useState(false);
    const [selectData, setSelectData] = useState(inputData);
    const [initValue, setInitValue] = useState('');
    const [loading, setLoading] = useState(false);

    const onDivClickHandler = () => {
        toolTip.setIsToolTipShown(false);
        toolTip.setIsAvailable(false);
        setEdit(true);
    }

    const onSelectBlurHandler = (e) => {
        if (!(e.relatedTarget === buttonRef.current)) {
            adminDevices.setUpdateDataTrigger(prev=>!adminDevices.updateDataTrigger());
            setEdit(false);
            toolTip.setIsAvailable(true);
        }
    }

    const onButtonBlurHandler = (e) => {
        adminDevices.setUpdateDataTrigger(prev=>!adminDevices.updateDataTrigger());
        setEdit(false);
        toolTip.setIsAvailable(true);
    }

    const onButtonClickHandler = async() => {

        if(isDeviceStateChanged(adminDevices, deviceId, dbFieldName, selectData)){
            setLoading(true);
            await changeDeviceData(deviceId, dbFieldName, selectData);
            setLoading(false);
            adminDevices.setUpdateDataTrigger(prev=>!adminDevices.updateDataTrigger());
        }
        setEdit(false);
        toolTip.setIsAvailable(true);
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
                    <select autoFocus ref={selectRef} value={selectData} onChange={onSelectChange} onBlur={onSelectBlurHandler}>
                        {opt}
                    </select>
                    <button ref={buttonRef} onClick={onButtonClickHandler} onBlur={onButtonBlurHandler}>V</button>
                  </div>}
        </td>
    );
});

export default withTooltip(TdTypeSelect);