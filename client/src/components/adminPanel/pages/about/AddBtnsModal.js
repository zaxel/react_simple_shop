import React, {useContext} from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Modal, Form, Spinner} from 'react-bootstrap';
import { Context } from '../../../..';
// import Spinner from 'react-bootstrap';

const AddBtnsModal = observer(({show, onHide}) => {
  const { aboutPage } = useContext(Context);

  if (aboutPage.loading) {
    return (
        <div className="spinner">
            <Spinner animation="border" />
        </div>
    )
}
    return (
      <Modal className="device-modal blocks-modal" centered show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Add Buttons To Block</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
        <Form.Group className="mb-3">
          <ul>
            <li>
              <Button variant="secondary" onClick={()=>console.log('55')}></Button>
              <div className='block-modal__title-cont'>
                <h5>text:</h5>
                <p>our brands</p>
              </div>
              <div className='block-modal__link-cont'>
                <h5>link:</h5>
                <p>/home/page22</p>
              </div>
            </li>
            <li>
              <Button variant="secondary" onClick={()=>console.log('55')}></Button>
              <div className='block-modal__title-cont'>
                <h5>text:</h5>
                <p>visit shop</p>
              </div>
              <div className='block-modal__link-cont'>
                <h5>link:</h5>
                <p>https://www.google.com</p>
              </div>
            </li>
            <li>
              <Button variant="secondary" onClick={()=>console.log('55')}></Button>
              <div className='block-modal__title-cont'>
                <h5>text:</h5>
                <p>more about us</p>
              </div>
              <div className='block-modal__link-cont'>
                <h5>link:</h5>
                <p>/about</p>
              </div>
            </li>
            <li>
              <Button variant="secondary" onClick={()=>console.log('55')}></Button>
              <div className='block-modal__title-cont'>
                <h5>text:</h5>
                <p>try it now</p>
              </div>
              <div className='block-modal__link-cont'>
                <h5>link:</h5>
                <p>/home/page22/othertext</p>
              </div>
            </li>
            <li>
              <Button variant="secondary" onClick={()=>console.log('55')}></Button>
              <div className='block-modal__title-cont'>
                <h5>text:</h5>
                <p>try it now</p>
              </div>
              <div className='block-modal__link-cont'>
                <h5>link:</h5>
                <p>/home/page22/othertext</p>
              </div>
            </li>
            <li>
              <Button variant="secondary" onClick={()=>console.log('55')}></Button>
              <div className='block-modal__title-cont'>
                <h5>text:</h5>
                <p>try it now</p>
              </div>
              <div className='block-modal__link-cont'>
                <h5>link:</h5>
                <p>/home/page22/othertext</p>
              </div>
            </li>
            <li>
              <Button variant="secondary" onClick={()=>console.log('55')}></Button>
              <div className='block-modal__title-cont'>
                <h5>text:</h5>
                <p>try it now</p>
              </div>
              <div className='block-modal__link-cont'>
                <h5>link:</h5>
                <p>/home/page22/othertext</p>
              </div>
            </li>
            <li>
              <Button variant="secondary" onClick={()=>console.log('55')}></Button>
              <div className='block-modal__title-cont'>
                <h5>text:</h5>
                <p>try it now</p>
              </div>
              <div className='block-modal__link-cont'>
                <h5>link:</h5>
                <p>/home/page22/othertext</p>
              </div>
            </li>
            <li>
              <Button variant="secondary" onClick={()=>console.log('55')}></Button>
              <div className='block-modal__title-cont'>
                <h5>text:</h5>
                <p>try it now</p>
              </div>
              <div className='block-modal__link-cont'>
                <h5>link:</h5>
                <p>/home/page22/othertext</p>
              </div>
            </li>
            <li>
              <Button variant="secondary" onClick={()=>console.log('55')}></Button>
              <div className='block-modal__title-cont'>
                <h5>text:</h5>
                <p>try it now</p>
              </div>
              <div className='block-modal__link-cont'>
                <h5>link:</h5>
                <p>/home/page22/othertext</p>
              </div>
            </li>
            <li>
              <Button variant="secondary" onClick={()=>console.log('55')}></Button>
              <div className='block-modal__title-cont'>
                <h5>text:</h5>
                <p>try it now</p>
              </div>
              <div className='block-modal__link-cont'>
                <h5>link:</h5>
                <p>/home/page22/othertext</p>
              </div>
            </li>
            <li>
              <Button variant="secondary" onClick={()=>console.log('55')}></Button>
              <div className='block-modal__title-cont'>
                <h5>text:</h5>
                <p>try it now</p>
              </div>
              <div className='block-modal__link-cont'>
                <h5>link:</h5>
                <p>/home/page22/othertext</p>
              </div>
            </li>
            <li>
              <Button variant="secondary" onClick={()=>console.log('55')}></Button>
              <div className='block-modal__title-cont'>
                <h5>text:</h5>
                <p>try it now</p>
              </div>
              <div className='block-modal__link-cont'>
                <h5>link:</h5>
                <p>/home/page22/othertext</p>
              </div>
            </li>
            <li>
              <Button variant="secondary" onClick={()=>console.log('55')}></Button>
              <div className='block-modal__title-cont'>
                <h5>text:</h5>
                <p>try it now</p>
              </div>
              <div className='block-modal__link-cont'>
                <h5>link:</h5>
                <p>/home/page22/othertext</p>
              </div>
            </li>
            
            
          </ul>  
          

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