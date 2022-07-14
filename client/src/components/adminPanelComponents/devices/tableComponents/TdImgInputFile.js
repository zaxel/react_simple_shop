import React, { useContext, useRef, useState, useEffect } from 'react';
import { Context } from '../../../..';
import { Spinner } from 'react-bootstrap';
import { updateImg } from '../../../../http/deviceAPI';
import { changeDeviceData } from '../../../../utils/adminDevices';
import { isDeviceStateChanged } from '../../../../utils/isStateChanged';
import AdminDeviceImgModal from '../modals/AdminDeviceImgModal';
import withTooltip from '../../../../hocs/withTooltip/withTooltip';

const TdImgInputFile = ({ data, innerRef }) => {

    const fileRef = useRef(null);
    const confirmRef = useRef(null);

    const { inputData, deviceId, dbFieldName } = data;
    const { toolTip, adminDevices } = useContext(Context);
    const [edit, setEdit] = useState(false);
    const [showModalImg, setShowModalImg] = useState(false);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);

    const onEditClickHandler = () => {
        toolTip.setIsToolTipShown(false);
        toolTip.setIsAvailable(false);
        setEdit(true);
    }

    const onConfirmBlurHandler = (e) => {
        if (!(e.relatedTarget === fileRef.current)) {
            setEdit(false);
            toolTip.setIsAvailable(true);
        }
    }
    const setNewImg = async () => {
        try {
            const formData = new FormData();
            formData.append('id', deviceId);
            formData.append('img', input);
            const data = await updateImg(formData);

        } catch (e) {
            alert(e.response.data.message)
        }

    }
    const onConfirmClickHandler = async () => {
        if (!input) {
            alert('no file added')
            return;
        } else if (input.type !== "image/jpeg") {
            alert('only jpg files accepted');
            return;
        }
        setLoading(true);
        setEdit(false);
        await setNewImg();
        setLoading(false);
        adminDevices.setUpdateDataTrigger(prev => !adminDevices.updateDataTrigger());
    }
    const onDeleteClickHandler = async () => {
        toolTip.setIsToolTipShown(false);
        const isDeleteConfirmed = window.confirm('delete device image permanently?')
        if(isDeleteConfirmed){
            setLoading(true);
            const noImageName = "no-image.jpg"
            const data = await changeDeviceData(deviceId, dbFieldName, noImageName);
            setLoading(false);
            adminDevices.setUpdateDataTrigger(prev => !adminDevices.updateDataTrigger());
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
                    <img alt='device' className='stripped-table__device-img' onClick={onImgClickHandler} src={process.env.REACT_APP_API_URL + inputData} />
                    <button className='td-active stripped-table__button-edit' onClick={onEditClickHandler}>edit</button>
                    <button className='td-active stripped-table__button-delete' onClick={onDeleteClickHandler}>X</button>
                </div>
                : <div className='display-flex'>
                    <input className='stripped-table__input-file' type='file' accept="image/*" ref={fileRef} onChange={onInputChange} />
                    <button className='stripped-table__button-confirm' ref={confirmRef} onClick={onConfirmClickHandler} onBlur={onConfirmBlurHandler}>update</button>
                </div>}
            <AdminDeviceImgModal src={process.env.REACT_APP_API_URL + inputData} show={showModalImg} onHide={() => setShowModalImg(false)} />
        </td>
    );
};

export default withTooltip(TdImgInputFile);