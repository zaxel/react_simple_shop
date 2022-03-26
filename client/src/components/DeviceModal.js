import React, { useContext, useState } from 'react';
import { Button, Modal, Form} from 'react-bootstrap';
import { Context } from '..';

const DeviceModal = ({show, onHide}) => {
    const [selectedType, setSelectedType] = useState('');
    const [selectedBrand, setSelectedBrand] = useState('');
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [specs, setSpecs] = useState([]);

    const {device} = useContext(Context);
    
    const addSpec = () => {setSpecs(prev=>
        [...prev, {id: Date.now(), title: '', descr: ''}]
    )}
    const editSpec = (val, id, objKey) => {
      setSpecs(prev=>prev.map(spec=>spec.id===id ? {...spec, [objKey]: val}:spec));
    }
    const delSpec = (id) => {
      setSpecs(prev=>prev.filter(spec=>spec.id!==id));
    }
    return (
      <Modal className="device-modal" centered show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Device</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
        <Form.Group className="mb-3">
            <Form.Select value={selectedType} onChange={(e)=>setSelectedType(e.currentTarget.value)} className="device-modal__select">
                <option>Choose Type</option>
                {device.types.map(type=>
                    <option key={type.id}>{type.name}</option>    
                )}
            </Form.Select>
            <Form.Select value={selectedBrand} onChange={(e)=>setSelectedBrand(e.currentTarget.value)} className="device-modal__select">
                <option>Choose Brand</option>
                {device.brands.map(brand=>
                    <option key={brand.id}>{brand.name}</option>    
                )}
            </Form.Select>
          <Form.Control value={title} onChange={(e)=>setTitle(e.currentTarget.value)} placeholder="Add Device Title"/>
          <Form.Control type="number" step="0.01" value={price} onChange={(e)=>setPrice(e.currentTarget.value)} placeholder="Add Price"/>
          <Form.Control type="file" className="device-modal__file"/>
          <hr/>
          <ul className='device-modal__spec-container'>
                {specs.map(spec=>
                    <li key={spec.id}>
                        <Form.Control value={spec.title} 
                          onChange={(e)=>editSpec(e.currentTarget.value, spec.id, Object.keys(spec)[1])} 
                          placeholder="Title"/>
                        <Form.Control value={spec.descr} 
                          onChange={(e)=>editSpec(e.currentTarget.value, spec.id, Object.keys(spec)[2])} 
                          placeholder="Description"/>
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
          <Button variant="primary" onClick={onHide}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    );
};

export default DeviceModal;