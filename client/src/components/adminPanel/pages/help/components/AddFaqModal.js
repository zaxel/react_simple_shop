import React, {useContext, useEffect} from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Modal, Form, Spinner} from 'react-bootstrap';
// import { Context } from '../../../..';
import { Context } from '../../../../..';


const AddFaqModal = observer(({show, onHide}) => {
  
  const { helpAdmin } = useContext(Context);
  // const blocks = aboutPage.editBlocks;

  useEffect(()=>{
    // fetchBlocks(helpAdmin);
  },[])

  // const cards = blocks.length && blocks.filter(card=>!card.block.infoAboutCardId).map(el => <BlockModalCard key={el.block.id} text={el.block.text} title={el.block.title} id={el.block.id}/>);
  
    return (
      <Modal className="device-modal blocks-modal" centered show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Add Blocks To Card</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        
        <Form.Group className="mb-3">
        {helpAdmin.loading ?
          <div className="spinner">
            <Spinner animation="border" />
          </div> : 
          <div>content</div>}
          {/* <ul>{cards.length ? cards : 'no blocks available'}</ul>}   */}
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