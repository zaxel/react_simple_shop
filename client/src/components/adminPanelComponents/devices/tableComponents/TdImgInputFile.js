import React, { useContext, useRef, useState, useEffect } from 'react';
import { Context } from '../../../..';
import { Spinner } from 'react-bootstrap';
import { updateDeviceImg } from '../../../../utils/adminDevices';
import { changeDeviceData } from '../../../../utils/adminDevices';
import AdminDeviceImgModal from '../modals/AdminDeviceImgModal';
import withTooltip from '../../../../hocs/withTooltip/withTooltip';
import { onTableCellClickHandler, onFileButtonBlurHandler, onClickNoChangeCheckHandler } from '../../../../utils/eventHandlers/commonInputTableFieldsHandlers';
import { formDataImg, correctImgTypeCheck } from '../../../../utils/formsServing/imgServing';

const TdImgInputFile = ({ data, innerRef }) => {

    const fileRef = useRef(null);
    const confirmRef = useRef(null);
    const { inputData, deviceId, dbFieldName } = data;
    const { toolTip, adminDevices, cart, user } = useContext(Context);
    const [edit, setEdit] = useState(false);
    const [showModalImg, setShowModalImg] = useState(false);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const noImageName = "no-image.jpg";

    const onEditClickHandler = () => {
        onTableCellClickHandler(toolTip, setEdit);
    }

    const onConfirmBlurHandler = (e) => {
        onFileButtonBlurHandler(toolTip, setEdit, e, fileRef)
        
    }
    const setNewImg = async () => {
        try {
            const formData = formDataImg(deviceId, input);
            return updateDeviceImg(formData, cart, user);
        } catch (e) {
            alert(e.response.data.message)
        }
    }
    const onConfirmClickHandler = async () => {
        if(!correctImgTypeCheck(input)) return;
        const cb = setNewImg;
        onClickNoChangeCheckHandler(setLoading, cb, adminDevices);
    }
    const onDeleteClickHandler = async () => {
        //not deleting image physically from server, but assigning no-image image instead 
        toolTip.setIsToolTipShown(false);
        const isDeleteConfirmed = window.confirm('delete device image permanently?')
        if(isDeleteConfirmed){
            const cb = changeDeviceData.bind(this, deviceId, dbFieldName, noImageName, cart, user);
            onClickNoChangeCheckHandler(setLoading, cb, adminDevices);
        } 
    }
    const onImgClickHandler = async () => {
        setShowModalImg(true);
    }
    const onInputChange = (e) => {
        setInput(prev => e.target.files[0])
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
                ? <div className='td-active' >
                    <img alt={inputData.alt} className='stripped-table__device-img' onClick={onImgClickHandler} src={process.env.REACT_APP_API_URL + inputData.src} />
                    <button className='td-active stripped-table__button-edit' onClick={onEditClickHandler}>edit</button>
                    <button className='td-active stripped-table__button-delete' onClick={onDeleteClickHandler}>X</button>
                </div>
                : <div className='display-flex'>
                    <input className='stripped-table__input-file' type='file' accept="image/*" ref={fileRef} onChange={onInputChange} />
                    <button className='stripped-table__button-confirm' ref={confirmRef} onClick={onConfirmClickHandler} onBlur={onConfirmBlurHandler}>update</button>
                </div>}
            <AdminDeviceImgModal src={process.env.REACT_APP_API_URL + inputData.src} alt={inputData.alt} show={showModalImg} onHide={() => setShowModalImg(false)} />
        </td>
    );
};

export default withTooltip(TdImgInputFile);