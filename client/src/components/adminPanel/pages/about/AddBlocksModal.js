import React, {useContext, useEffect} from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Modal, Form, Spinner} from 'react-bootstrap';
import { Context } from '../../../..';
import BlockModalCard from './BlockModalCard';
import { fetchBlocks } from '../../../../utils/staticPages/aboutPage';


const AddBlocksModal = observer(({show, onHide}) => {
  
  const { aboutPage } = useContext(Context);
  const blocks = aboutPage.editBlocks;

  console.log(aboutPage.editBlocks)
  const cards = blocks.length && blocks.map(el => <BlockModalCard key={el.block.id} text={el.block.text} title={el.block.title} id={el.block.id}/>);
  useEffect(()=>{
    fetchBlocks(aboutPage);
  },[])
  
    return (
      <Modal className="device-modal blocks-modal" centered show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Add Blocks To Card</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        
        <Form.Group className="mb-3">
        {aboutPage.loading ?
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

export default AddBlocksModal;