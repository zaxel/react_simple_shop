import React from 'react';
import { Button, Modal, Form} from 'react-bootstrap';

const UserOrderModal = ({show, onHide}) => {
    return (
        <Modal className='modal-table' centered show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Type</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
        <Form.Group className="mb-3">
        <table className='stripped-table'>
                <tr>
                    <th>device</th>
                    <th>amount ordered</th>
                    <th>rating</th>
                    <th>price</th>
                </tr>
                <tr>
                    <td>Siemens * M</td>
                    <td>1</td>
                    <td>4.2</td>
                    <td>$365.00</td>
                </tr>
                <tr>
                    <td>Samsung * m</td>
                    <td>2</td>
                    <td>2.5</td>
                    <td>$200.00</td>
                </tr>
                <tr>
                    <td>Samsung * 8lqvZ2k</td>
                    <td>1</td>
                    <td>5.0</td>
                    <td>$155.00</td>
                </tr>
                <tr>
                    <td>Nokia 8998</td>
                    <td>2</td>
                    <td>4.2</td>
                    <td>$30.00</td>
                </tr>
                <tr>
                    <td>LG -- 3775</td>
                    <td>5</td>
                    <td>3.5</td>
                    <td>$15.00</td>
                </tr>
                <tr>
                    <td>Nokia 45885</td>
                    <td>1</td>
                    <td>4.7</td>
                    <td>$5.00</td>
                </tr>
            </table>
        </Form.Group>
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
            
       
    );
};

export default UserOrderModal;