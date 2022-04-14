import React, { useContext, useState, useEffect, useLayoutEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '..';
import { createDevice, fetchTypes, fetchBrands, fetchAllDevices } from '../http/deviceAPI';
import { observer } from 'mobx-react-lite';
import {SAMPLE_ROUTE} from '../utils/consts';

const DeviceBulkModal = observer(({ show, onHide }) => {
  const [img, setImg] = useState('');

  const { device } = useContext(Context);
  


  const setNewDevice = async () => {
    try {
      onHide();
      const formData = new FormData();
      formData.append('img', img);
      const data = await createDevice(formData);
      // formReset();
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

          <Form.Control type="file" onChange={e => setImg(e.target.files[0])} className="device-modal__file" />
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
        <Button variant="primary" onClick={setNewDevice}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default DeviceBulkModal;