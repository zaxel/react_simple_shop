import { Modal } from 'react-bootstrap';

const AdminDeviceImgModal = ({ alt, src, show, onHide }) => {
    
    return (
        <Modal className="device-modal" centered show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>image</Modal.Title>
        </Modal.Header>
        <Modal.Body className='device-img__modal-body'>
            <img className='device-img__modal' src={src} alt={alt}/>
        </Modal.Body>
        </Modal>
    );
};

export default AdminDeviceImgModal;