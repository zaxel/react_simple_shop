import React, {useContext, useEffect, useState} from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Modal, Form, Spinner} from 'react-bootstrap';
// import { Context } from '../../../..';
import { Context } from '../../../../..';
import AddFaqModalCard from './AddFaqModalCard';
import { fetchFaqQuestions } from '../../../../../utils/staticPages/helpPage';


const AddFaqModal = observer(({show, onHide}) => {
  const [loading, setLoading] = useState(false);
  const { helpAdmin } = useContext(Context);

  useEffect(()=>{
    (async()=>{
      setLoading(true);
      await fetchFaqQuestions(helpAdmin);
      setLoading(false);
    })()
  },[])

  const cards = helpAdmin.allQuestions.length && helpAdmin.allQuestions.filter(faq=>!faq.infoHelpCategoryId).map(el => <AddFaqModalCard title='add to category' setLoading={setLoading} key={el.id} question={el.question} id={el.id}/>);
  
    return (
      <Modal className="device-modal blocks-modal" centered show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Add FAQ's To Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        
        <Form.Group className="mb-3">
        {loading ?
          <div className="spinner">
            <Spinner animation="border" />
          </div> : 
          <ul>{cards.length ? cards : 'no FAQ\'s available'}</ul>}  
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

export default AddFaqModal;