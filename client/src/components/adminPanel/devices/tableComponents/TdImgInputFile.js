import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../../../..';
import AdminDeviceImgModal from '../modals/AdminDeviceImgModal';
import withTooltip from '../../../../hocs/withTooltip/withTooltip';
import no_image from '../../../../assets/no-image.jpg';

const TdImgInputFile = ({ data, innerRef }) => {
    const { inputData, deviceId, dbFieldName } = data;
    const { toolTip } = useContext(Context);
    const [showModalImg, setShowModalImg] = useState(false);
    const imagesInAdmLine = 4;

    const onImgClickHandler = async () => {
        setShowModalImg(true);
    }

    useEffect(() => {
        //   destroy all event listeners tooltips
        return () => toolTip?.hoverIntentDestroy();
    }, [])

    const images = inputData.src.map((imgData, i) => {
        return i < imagesInAdmLine && <img key={imgData.id} alt={inputData.alt + " " + imgData.title} className='stripped-table__device-img' onClick={onImgClickHandler} src={imgData?.thumb?.url || no_image} />
    })
    return (
        <td ref={innerRef}>
            <div className='td-active display-flex justify-content-between align-items-center' >
                {images}
                <button className='td-active stripped-table__button-edit' onClick={onImgClickHandler}>edit</button>
            </div>
            <AdminDeviceImgModal deviceId={deviceId} src={inputData.src} alt={inputData.alt} show={showModalImg} onHide={() => setShowModalImg(false)} />
        </td>
    );
};

export default withTooltip(TdImgInputFile);