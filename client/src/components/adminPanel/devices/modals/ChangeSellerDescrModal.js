import React, { useContext, useEffect, useState } from 'react';
import { Button, Modal, Form, Spinner } from 'react-bootstrap';
import { Context } from '../../../..';
import { observer } from 'mobx-react-lite';
import { changeDeviceData } from '../../../../utils/administration/adminDevices';

const ChangeSellerDescrModal = observer(({ show, onHide }) => {
  const { adminDevices, cart, user } = useContext(Context);
  const [sellerDescr, setSellerDescr] = useState('');
  const [loading, setLoading] = useState(false); 



  useEffect(() => {
    adminDevices.setDeviceSellerDescription(); 
    setSellerDescr(adminDevices.deviceSellerDescription);

  }, [adminDevices.deviceActive])

  const isStateChanged = () => {
    return adminDevices.deviceSellerDescription !== sellerDescr;
  }

  const setUpdatedSellerDescr = async () => {
    try {
      if (isStateChanged()) {
        setLoading(true);
        const flags={ loadingOn: false, loadingOff: false, setToStore: true, setPageTotal: false, checkIfAuth: true }
        await changeDeviceData(adminDevices.deviceActive, "seller_dscr", sellerDescr, cart, user, adminDevices, flags);
      }
    } catch (e) {
      alert(e.response.data.message)
    }finally{
      adminDevices.setClearDeviceSellerDescription();
      adminDevices.setUpdateDataTrigger(!adminDevices.updateDataTrigger); 
      setLoading(false);
      onHide();
    }

  }

  return (
    <Modal className="device-modal" centered show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Change Seller Item Description</Modal.Title>
      </Modal.Header>
      <Modal.Body>

        <Form.Group className="mb-3 text-center">
        {loading 
        ?  <Spinner animation="border"/> 
         : <textarea className="form-control" value={sellerDescr} onChange={(e) => setSellerDescr(e.currentTarget.value)} id="FormControlTextareaSellerItemDescrModal" rows="5" placeholder="Seller description"></textarea>
        }
        </Form.Group>

      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        {!loading && <Button variant="primary" onClick={setUpdatedSellerDescr}>
          Save
        </Button>}
      </Modal.Footer>
    </Modal>
  );
});

export default ChangeSellerDescrModal;