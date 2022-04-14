import React, { useRef, useState } from 'react';
import { Button, Modal, Form} from 'react-bootstrap';
import { createBrand } from '../http/deviceAPI';

const BrandModal = ({show, onHide}) => {
    const [brand, setBrand] = useState('');
    const inputRef = useRef(null);

    const setNewBrand = () => {
      onHide();
      createBrand(brand)
        .then(data=>alert(`new brand "${data.name}" added`))
        .then(_=>setBrand(''))
        .catch(e=> alert(e + ': \n\r'+ e.response.data.message));
    }

    return (
      <Modal centered show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Brand</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
        <Form.Group className="mb-3">
          <Form.Control ref={inputRef} value={brand} onChange={(e)=>setBrand(e.currentTarget.value)} placeholder="new brand"/>
        </Form.Group>
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
          <Button variant="primary" onClick={setNewBrand}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    );
};

export default BrandModal;