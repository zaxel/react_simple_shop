import React, {useContext, useEffect} from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Modal, Form, Spinner} from 'react-bootstrap';
import { Context } from '../../../..';
import ButtonModalCard from './ButtonModalCard';


const AddBtnsModal = observer(({show, onHide}) => {
  const { aboutPage } = useContext(Context);
  const btns = aboutPage.buttonsModal;
  const btnsId = Object.keys(btns);
  const cards = btnsId.length && btnsId.map(id => <ButtonModalCard key={id} text={btns[id]['text']} link={btns[id]['link']} id={id}/>);
  
    return (
      <Modal className="device-modal blocks-modal" centered show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Add Buttons To Block</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        
        <Form.Group className="mb-3">
        {aboutPage.modalBtnsLoading ?
          <div className="spinner">
            <Spinner animation="border" />
          </div> :
          <ul>{cards}</ul>}  
        </Form.Group>
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
});

export default AddBtnsModal;