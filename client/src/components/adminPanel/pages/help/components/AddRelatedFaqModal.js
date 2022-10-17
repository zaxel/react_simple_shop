import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import { Button, Form, Modal, Spinner } from 'react-bootstrap';
import { Context } from '../../../../..';
import { fetchFaqCategory, fetchFaqQuestions } from '../../../../../utils/staticPages/helpPage';
import FaqModalCard from './FaqModalCard';

const AddRelatedFaqModal = observer(({show, onHide}) => {
    const { helpAdmin } = useContext(Context);
  
  const categories = helpAdmin.categories;
  const questions = helpAdmin.allQuestions;

  useEffect(()=>{
    (async()=>{
      helpAdmin.setModalFaqLoading(true);
      await fetchFaqQuestions(helpAdmin);
      await fetchFaqCategory(helpAdmin); 
      helpAdmin.setModalFaqLoading(false);
    })()
  }, [])

  const questionsCards = questions.length && questions.filter(item => {
    const isRelatedAlreadyAdded = helpAdmin.faqRelated.some(el=>el.infoHelpQuestionId===item.id);
    return item.infoHelpCategoryId && categories.length && !isRelatedAlreadyAdded
    }).map(card=><FaqModalCard key={card.id} text={card.question} id={card.id} category={categories.find(cat=>cat.id===card.infoHelpCategoryId)?.title || ''}/>);

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
          <ul>{questionsCards.length ? questionsCards : <li>no relations available</li>}</ul>}   
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

export default AddRelatedFaqModal;