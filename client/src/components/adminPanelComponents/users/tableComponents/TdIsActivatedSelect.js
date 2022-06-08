import React, { useEffect, useContext, useRef, useState } from 'react';
import { Context } from '../../../..';
import withTooltip from '../../../../hocs/withTooltip/withTooltip';
import { isStateChanged } from '../../../../utils/isStateChanged';
import { Spinner } from 'react-bootstrap';
import { changeUserData } from '../../../../utils/adminUsers';

const TdIsActivatedSelect = ({ data, innerRef }) => {

    const {inputData, userId, dbFieldName } = data;
    const { toolTip, users } = useContext(Context);
    const [edit, setEdit] = useState(false);
    const [selectData, setSelectData] = useState(inputData);
    const [loading, setLoading] = useState(false);



    const strToBool = (str) => {
        if(str === 'true')return true;
        return false;
    }
    const onDivClickHandler = () => {
        toolTip.setIsToolTipShown(false);
        toolTip.setIsAvailable(false);
        setEdit(true);
    }
    const onButtonClickHandler = async() => {
        if(isStateChanged(users, userId, 'isActivated', strToBool(selectData))){
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
                ? <div className='td-active' onClick={onDivClickHandler}>{selectData === 'true' ? 'activated' : 'not activated'}</div>
                : <div className='display-flex'>
                    <select value={selectData} onChange={onSelectChange}>
                        <option value={'true'}>activated</option>
                        <option value={'false'}>not activated</option>
                    </select>
                    <button onClick={onButtonClickHandler}>V</button>
                  </div>}
                
        </td>
    );
};

export default withTooltip(TdIsActivatedSelect);