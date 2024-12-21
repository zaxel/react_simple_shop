import { Button, Modal, Form, Spinner } from 'react-bootstrap';
import AdminImage from '../../commonComponents/AdminImage';
import { addDeviceImg, deleteDeviceImg, updateDeviceImg } from '../../../../utils/administration/adminDevices';
import { useContext, useState } from 'react';
import { Context } from '../../../..';
import { formDataNewImages } from '../../../../utils/formsServing/deivceServing';

const AdminDeviceImgModal = ({ deviceId, alt, src, show, onHide }) => {
    const [newImages, setNewImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const { cart, user, adminDevices } = useContext(Context);

    const delNewImg = (id) => {
        setNewImages(prev => prev.filter(img => img.id !== id));
    }
    const addNewImgField = (id) => {
        setNewImages(prev =>
            [...prev, { id: Date.now(), img: '' }]
        )
    }
    const setNewImg = (id, data) => {
        setNewImages(prev => {
            prev.find(image => image.id === id).img = data;
            return prev;

        });
    }
    const isNewImagesInStore = () => {
        const imagesInStore = newImages.filter(img => img.img);
        let isInStoreNewImages = imagesInStore.length > 0;
        return isInStoreNewImages;
    }

    const saveNewImages = async () => {
        try {
            if (!isNewImagesInStore())
                throw new Error('no new images data found');
            setLoading(true);
            const formData = formDataNewImages(deviceId, newImages);
            const { loggedOut, rejected, fulfilled } = await addDeviceImg(formData, cart, user);
            if (loggedOut) return;
            fulfilled && alert(fulfilled + " images successfully created!");
            adminDevices.setUpdateDataTrigger(!adminDevices.updateDataTrigger);
        } catch (e) {
            console.error(e)
            alert(e)
        }finally{
            setLoading(false);
        }
    }

    const onDeleteClickHandler = async (imgId) => {
        const isDeleteConfirmed = window.confirm('delete device image permanently?')
        if (isDeleteConfirmed) {
            await deleteDeviceImg({ deviceId, imgId }, cart, user);
            adminDevices.setUpdateDataTrigger(!adminDevices.updateDataTrigger);
        }
    }
    const images = src.map(sr => {
        return <div key={sr.id} className="device-img__modal-images w-25 position-relative">
            <AdminImage index={sr.id} id={deviceId} inputTitle={''} imgDbCollName={''} inputData={sr.url} alt={alt + " " + sr.title} cb={updateDeviceImg} isExternal={true} />
            <Button className='btn-danger btn-lg position-absolute bottom-0 translate-middle' onClick={() => onDeleteClickHandler(sr.id)}>X</Button>
        </div>
    })
    const newImagesAddForm = newImages.map(img =>
        <li key={img.id} className="w-100">
            <Form.Control type="file" onChange={e => setNewImg(img.id, e.target.files[0])} className="flex-grow-1" />
            <Button onClick={delNewImg.bind(null, img.id)} variant="danger">x</Button>
        </li>
    )
    return (
        <Modal size="lg" className="" show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>item images administration</Modal.Title>
            </Modal.Header>
            <Modal.Body className='device-img__modal-body mb-3'>
                <div className='d-flex flex-wrap justify-content-evenly mb-3'>
                    {images}
                </div>
                
                {loading 
                    ?   <Spinner animation="border" />
                    :   <div>
                            <ul className='device-modal__spec-container mb-3'>
                                {newImagesAddForm}
                            </ul>
                            <Button variant="secondary" onClick={addNewImgField}>Add Another Image</Button>
                        </div>}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
                <Button variant="primary" onClick={saveNewImages}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AdminDeviceImgModal;