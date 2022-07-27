import React, { useRef, useState } from 'react';
import { Button, Modal, Form} from 'react-bootstrap';
import { createTypes as createType } from '../../http/deviceAPI';

const TypeModal = ({show, onHide}) => {
    const [type, setTypeValue] = useState('');
    const inputRef = useRef(null);

    const setNewType = () => {
      onHide();
      createType(type)
      .then(data=>alert(`new type "${data.name}" added`))
      .then(_=>setTypeValue(''))
      .catch(e=> alert(e + ': \n\r'+ e.response.data.message));
    }

    return (
      <Modal centered show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Type</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
        <Form.Group className="mb-3">
          <Form.Control ref={inputRef} value={type} onChange={(e)=>setTypeValue(e.currentTarget.value)} placeholder="new type"/>
        </Form.Group>
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
          <Button variant="primary" onClick={setNewType}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    );
};

export default TypeModal;