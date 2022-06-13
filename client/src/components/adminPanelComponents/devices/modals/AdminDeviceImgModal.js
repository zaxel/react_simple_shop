import { Button, Modal, Form} from 'react-bootstrap';

const AdminDeviceImgModal = ({ src, show, onHide }) => {
    
    return (
        <Modal className="device-modal" centered show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>image</Modal.Title>
        </Modal.Header>
        <Modal.Body className='device-img__modal-body'>
            <img className='device-img__modal' src={src}/>
        </Modal.Body>
        </Modal>


    );
};

export default AdminDeviceImgModal;