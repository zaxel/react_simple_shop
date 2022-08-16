import React, { useContext, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Context } from '../../../..';
import { createBulkDevices } from '../../../../utils/administration/adminDevices';
import { observer } from 'mobx-react-lite';
import {SAMPLE_ROUTE} from '../../../../utils/consts/routes';

const AddDeviceBulkModal = observer(({ show, onHide }) => {
  const [file, setFile] = useState('');
  const { adminDevices, cart, user } = useContext(Context);
  const setBulkDevice = async () => {
    try {
      onHide();
      const formData = new FormData();
      formData.append('file', file);
      const { created_updated, loggedOut } = await createBulkDevices(formData, cart, user);
      if(loggedOut)return;
      created_updated && alert(created_updated + ' has been created!' );
      adminDevices.setUpdateDataTrigger(!adminDevices.updateDataTrigger);
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

export default AddDeviceBulkModal;