﻿import React, { useRef, useState } from 'react';
import { Button, Modal, Form} from 'react-bootstrap';

const BrandModal = ({show, onHide}) => {
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef(null);

    return (
      <Modal centered show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Brand</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
        <Form.Group className="mb-3">
          <Form.Control ref={inputRef} value={inputValue} onChange={(e)=>setInputValue(e.currentTarget.value)} placeholder="new brand"/>
        </Form.Group>
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
          <Button variant="primary" onClick={onHide}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    );
};

export default BrandModal;