import React, { useContext, useState, useEffect, useLayoutEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../..';
import { createBulkDevices} from '../../http/deviceAPI';
import { observer } from 'mobx-react-lite';
import {SAMPLE_ROUTE} from '../../utils/consts';

const DeviceBulkModal = observer(({ show, onHide }) => {
  const [file, setFile] = useState('');
  const { device } = useContext(Context);
  const setBulkDevice = async () => {
    try {
      onHide();
      const formData = new FormData();
      formData.append('file', file);
      const data = await createBulkDevices(formData);
      alert(JSON.stringify(data))
    } catch (e) {
      alert(e.response.data.message)
    }

  }
  return (
    <Modal className="device-modal" centered show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Device</Modal.Title>
      </Modal.Header>
      <Modal.Body>

        <Form.Group className="mb-3">

          <Form.Control type="file" onChange={e => setFile(e.target.files[0])} className="device-modal__file" />
          <hr />
          <div className='device-modal__descr'>
            <p>file must be .txt</p>
            <p>file instance: <Link to={SAMPLE_ROUTE} target="_blank">sample</Link></p>
          </div>

        </Form.Group>

      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={setBulkDevice}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default DeviceBulkModal;