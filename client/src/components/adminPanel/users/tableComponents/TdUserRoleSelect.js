import React, { useEffect, useContext, useState, useRef } from 'react';
import { Context } from '../../../..';
import withTooltip from '../../../../hocs/withTooltip/withTooltip';
import { Spinner } from 'react-bootstrap';
import { changeUserData } from '../../../../utils/administration/adminUsers';
import { onTableCellClickHandler, onInputBlurHandler, onInputButtonBlurHandler, onInputButtonClickHandler } from '../../../../utils/eventHandlers/commonInputTableFieldsHandlers';

const TdUserRoleSelect = ({ data, innerRef }) => {

    const selectRef = useRef(null);
    const buttonRef = useRef(null);

    const {inputData, userId, dbFieldName } = data;
    const { toolTip, users, cart, user } = useContext(Context);
    const [edit, setEdit] = useState(false);
    const [selectData, setSelectData] = useState(inputData);
    const [loading, setLoading] = useState(false);

    const onDivClickHandler = () => {
        onTableCellClickHandler(toolTip, setEdit);
    }

    const onSelectBlurHandler = (e) => {
        onInputBlurHandler(toolTip, setEdit, e, buttonRef, users, userId, dbFieldName, selectData);
    }

    const onButtonBlurHandler = () => {
        onInputButtonBlurHandler(toolTip, setEdit, users, userId, dbFieldName, selectData);
    }

    const onButtonClickHandler = async() => {
        const cb = changeUserData.bind(this, userId, dbFieldName, selectData, cart, user);
        onInputButtonClickHandler(toolTip, setEdit, setLoading, cb, users, userId, dbFieldName, selectData);
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
                    <select autoFocus ref={selectRef} value={selectData} onChange={onSelectChange} onBlur={onSelectBlurHandler}>
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