import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Button, Form, Modal, Spinner } from 'react-bootstrap';
import { Context } from '../../../../..';
import FaqModalCard from './FaqModalCard';

const AddFaqModal = observer(({show, onHide}) => {
    const { helpAdmin } = useContext(Context);
  const questions = helpAdmin.allQuestions;
  const categories = helpAdmin.categories;
//   const btnsId = Object.keys(btns);
  const questionsCards = questions.length && questions.map(item => <FaqModalCard key={item.id} text={item.question} id={item.id} category={categories.find(cat=>cat.id===item.infoHelpCategoryId).title}/>);
  
    return (
      <Modal className="device-modal blocks-modal adminFaq__modal-related" centered show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Add Related Question:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        
        <Form.Group className="mb-3">
        {helpAdmin.modalFaqLoading ?
          <div className="spinner">
            <Spinner animation="border" />
          </div> :
          <ul>{questionsCards}</ul>}   
        </Form.Group>
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
})

export default AddFaqModal;