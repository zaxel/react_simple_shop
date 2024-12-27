import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Context } from '../../../..';
import { observer } from 'mobx-react-lite';
import { SAMPLE_ROUTE } from '../../../../utils/consts/routes';
import { fileToArray } from '../../../../utils/dataFormat/convertTypes';
import { BATCH_SIZE, DELAY_BETWEEN_BATCH_REQ } from '../../../../utils/consts/bulkUpload';
import BulkItemsUploadStatusAlert from '../../alerts/BulkItemsUploadStatusAlert';
import { addBulkItemsInBatches} from '../../../../utils/administration/adminAddItemsBulk';

const AddDeviceBulkModal = observer(({ show, onHide }) => {
  const [arrayFile, setArrayFile] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [status, setStatus] = useState(null);
  const successAddRef = useRef(0);
  const failedAddRef = useRef(0);
  const imagesSavedSuccesses = useRef(0);
  const imagesSavedFails = useRef(0);
  const breakRef = useRef(false);
  const acceptedFileType = 'text/plain';

  const { adminDevices, cart, user } = useContext(Context);

  const signalsRef = useRef([]);

  useEffect(() => {
    return () => {
      signalsRef.current.forEach(controller => controller.abort());
      signalsRef.current = [];
      breakRef.current = true;
    };
  }, []);

  const handleFileUpload = (file) => {
    
    fileToArray(file, acceptedFileType, setArrayFile);
  };

  const addController = (controller) => signalsRef.current.push(controller);
  const removeController = (controller) => {
    signalsRef.current = signalsRef.current.filter((ctrl) => ctrl !== controller);
  };

  async function setBulkDevice() {
    try {
      setIsSaving(true);
      if (!arrayFile) {
        alert('no file selected.'); 
        return;
      }
      const { failures, imageFails, successes, imageSuccesses } = await addBulkItemsInBatches(breakRef, arrayFile, BATCH_SIZE, DELAY_BETWEEN_BATCH_REQ, addController, removeController, cart, user, setStatus);
      failedAddRef.current += failures;
      successAddRef.current += successes;
      imagesSavedFails.current += imageFails;
      imagesSavedSuccesses.current += imageSuccesses;
      
      setStatus('process completed.');
      BulkItemsUploadStatusAlert(breakRef.current, successAddRef.current, failedAddRef.current, imagesSavedSuccesses.current, imagesSavedFails.current);
      adminDevices.setUpdateDataTrigger(!adminDevices.updateDataTrigger);
    
    } catch (e) {
      console.error('Unexpected error during bulk processing:', e);

    } finally {

      setStatus(null);
      setIsSaving(false);
    }
  }

  return (
    <Modal className="device-modal" centered show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Devices</Modal.Title>
      </Modal.Header>
      <Modal.Body>

        <Form.Group className="mb-3">

          <Form.Control type="file" onChange={e => handleFileUpload(e.target.files[0])} className="device-modal__file" />
          <hr />
          <div className='device-modal__descr'>
            <div className={!status ? 'd-none' : 'd-block fw-bold'}>status: {status}</div>
            <p>File must be .txt format.</p>
            <p>Please do not refresh or close this windows until process is completed.</p>
            <p>File instance: <Link to={SAMPLE_ROUTE} target="_blank">sample</Link></p>
          </div>

        </Form.Group>

      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={setBulkDevice} disabled={isSaving}>
          {isSaving ? "Saving..." : "Save"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default AddDeviceBulkModal;