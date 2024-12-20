import React, { useContext, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { Context } from '../../../..';
import { createDevice } from '../../../../utils/administration/adminDevices';
import { observer } from 'mobx-react-lite';
import { formDataNewDeviceOuterImgStore } from '../../../../utils/formsServing/deivceServing';

const AddDeviceModal = observer(({ show, onHide }) => {
  const [selectedType, setSelectedType] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [sellerDescr, setSellerDescr] = useState('');
  const [specs, setSpecs] = useState([]);
  const [images, setImages] = useState([{ id: Date.now(), img: '' }]);

  const { adminDevices, cart, user } = useContext(Context);

  const onTypePickHandler = (e) => {
    const pickedTypeValue = e.currentTarget.value;
    setSelectedType(pickedTypeValue);
    adminDevices.setTypeActive(adminDevices.types.find(type => type.name === pickedTypeValue).id);
  }
  const onBrandPickHandler = (e) => {
    const pickedBrandValue = e.currentTarget.value;
    setSelectedBrand(pickedBrandValue);
    adminDevices.setBrandActive(adminDevices.brands.find(type => type.name === pickedBrandValue).id);
  }

  const delImg = (id) => {
    setImages(prev => prev.filter(img => img.id !== id));
  }
  const addImgField = (id) => {
    setImages(prev =>
      [...prev, { id: Date.now(), img: '' }]
    )
  }
  const setImg = (id, data) => {
    setImages(prev => {
      prev.find(image => image.id === id).img = data;
      return prev;

    });
  }

  const addSpec = () => {
    setSpecs(prev =>
      [...prev, { id: Date.now(), title: '', description: '' }]
    )
  }
  const editSpec = (val, id, objKey) => {
    setSpecs(prev => prev.map(spec => spec.id === id ? { ...spec, [objKey]: val } : spec));
  }
  const delSpec = (id) => {
    setSpecs(prev => prev.filter(spec => spec.id !== id));
  }
  const formReset = () => {
    setSelectedType('');
    setSelectedBrand('');
    setTitle('');
    setPrice('');
    setSellerDescr('');
    setSpecs([]);
    adminDevices.setTypeActive(null);
    adminDevices.setBrandActive(null);
  }

  const setNewDevice = async () => {
    try {
      onHide();
      const formData = formDataNewDeviceOuterImgStore(title, price, adminDevices.brandActive, adminDevices.typeActive, specs, images, sellerDescr);
      const { loggedOut, name } = await createDevice(formData, cart, user);
          if(loggedOut)return;
      name && alert('device "' + name +'" successfully created!');
      formReset();
      adminDevices.setUpdateDataTrigger(!adminDevices.updateDataTrigger);
    } catch (e) {
      alert(e.response?.data?.message)
    }
  }

  return (
    <Modal className="device-modal" centered show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Device</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3">
          <Form.Select value={selectedType} onChange={onTypePickHandler} className="device-modal__select">
            <option>Choose Type</option>
            {adminDevices.types.map(type =>
              <option key={type.id}>{type.name}</option>
            )}
          </Form.Select>
          <Form.Select value={selectedBrand} onChange={onBrandPickHandler} className="device-modal__select">
            <option>Choose Brand</option>
            {adminDevices.brands.map(brand =>
              <option key={brand.id}>{brand.name}</option>
            )}
          </Form.Select>
          <Form.Control value={title} onChange={(e) => setTitle(e.currentTarget.value)} placeholder="Add Device Title" />
          <Form.Control type="number" step="0.01" value={price} onChange={(e) => setPrice(e.currentTarget.value)} placeholder="Add Price" />
          <textarea className="form-control mb-2" value={sellerDescr} onChange={(e) => setSellerDescr(e.currentTarget.value)} id="FormControlTextareaSellerItemDescrModal" rows="4" placeholder="Seller description"></textarea>
          <ul className='device-modal__spec-container'>
            {images.map(img =>
              <li key={img.id} className="w-100">
                <Form.Control type="file" onChange={e => setImg(img.id, e.target.files[0])} className="flex-grow-1" />
                <Button onClick={delImg.bind(null, img.id)} variant="danger">x</Button>
              </li>
            )}
          </ul>
          <Button variant="secondary" onClick={addImgField}>Add Another Image</Button>
          <hr />
          <ul className='device-modal__spec-container'>
            {specs.map(spec =>
              <li key={spec.id}>
                <Form.Control value={spec.title}
                  onChange={(e) => editSpec(e.currentTarget.value, spec.id, Object.keys(spec)[1])}
                  placeholder="Title" />
                <Form.Control value={spec.description}
                  onChange={(e) => editSpec(e.currentTarget.value, spec.id, Object.keys(spec)[2])}
                  placeholder="Description" />
                <Button onClick={delSpec.bind(null, spec.id)} variant="danger">x</Button>
              </li>
            )}
          </ul>
          <Button variant="secondary" onClick={addSpec}>Add Specifications</Button>
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

export default AddDeviceModal;