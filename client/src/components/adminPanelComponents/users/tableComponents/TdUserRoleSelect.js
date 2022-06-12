import React, { useEffect, useContext, useState, useRef } from 'react';
import { Context } from '../../../..';
import withTooltip from '../../../../hocs/withTooltip/withTooltip';
import { isUserStateChanged } from '../../../../utils/isStateChanged';
import { Spinner } from 'react-bootstrap';
import { changeUserData } from '../../../../utils/adminUsers';

const TdUserRoleSelect = ({ data, innerRef }) => {

    const selectRef = useRef(null);
    const buttonRef = useRef(null);

    const {inputData, userId, dbFieldName } = data;
    const { toolTip, users } = useContext(Context);
    const [edit, setEdit] = useState(false);
    const [selectData, setSelectData] = useState(inputData);
    const [loading, setLoading] = useState(false);

    const onDivClickHandler = () => {
        toolTip.setIsToolTipShown(false);
        toolTip.setIsAvailable(false);
        setEdit(true);
    }

    const onSelectBlurHandler = (e) => {
        if (!(e.relatedTarget === buttonRef.current)) {
            users.setUpdateDataTrigger(prev=>!users.updateDataTrigger());
            setEdit(false);
            toolTip.setIsAvailable(true);
        }
    }

    const onButtonBlurHandler = (e) => {
        users.setUpdateDataTrigger(prev=>!users.updateDataTrigger());
        setEdit(false);
        toolTip.setIsAvailable(true);
    }

    const onButtonClickHandler = async() => {
        if(isUserStateChanged(users, userId, dbFieldName, selectData)){
            setLoading(true);
            await changeUserData(userId, dbFieldName, selectData);
            setLoading(false);
            users.setUpdateDataTrigger(prev=>!users.updateDataTrigger());
        }
        setEdit(false);
        toolTip.setIsAvailable(true);
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
                ? <div className='td-active' onClick={onDivClickHandler}>{selectData}</div>
                : <div className='display-flex'>
                    <select ref={selectRef} value={selectData} onChange={onSelectChange} onBlur={onSelectBlurHandler}>
                        <option value="ADMIN">ADMIN</option>
                        <option value="MODERATOR">MODERATOR</option>
                        <option value="USER">USER</option>
                    </select>
                    <button ref={buttonRef} onClick={onButtonClickHandler} onBlur={onButtonBlurHandler}>V</button>
                  </div>}
        </td>
    );
};

export default withTooltip(TdUserRoleSelect);