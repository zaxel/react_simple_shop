import React, {useContext, useRef, useEffect} from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { Context } from '../../../..';
import { v4 as uuidv4 } from 'uuid';
import TrOrderDetails from './components/TrOrderDetails';
import ThOrderDetailsTooltip from './components/ThOrderDetailsTooltip';
import { fetchOrderDetails } from '../../../../utils/adminOrders';
import { observer } from 'mobx-react-lite';
import { Spinner } from 'react-bootstrap';

const OrderDetail = observer(({ show, onHide }) => {
    const { orderDetails, cart, user } = useContext(Context);
    let thRefs = useRef([]); 

    useEffect(() => {
        fetchOrderDetails(orderDetails, orderDetails.orderId, cart, user);
    }, [orderDetails.updateDataTrigger])

    
    const ths = [
        {title: 'device id', sortBy: 'id'}, 
        {title: 'title', sortBy: 'name'}, 
        {title: 'amount ordered', sortBy: null}, 
        {title: 'rate', sortBy: 'rate'}, 
        {title: 'price', sortBy: 'price'}, 
    ];

    const tds = [
        { deviceId: 3655, name: 'tester', device_amount: '2', rate: '1', price: 165},
        { deviceId: 3657, name: 'router', device_amount: '7', rate: '3', price: 165 },
        { deviceId: 3659, name: 'fixer', device_amount: '1', rate: '4', price: 165 },
        { deviceId: 3675, name: 'box', device_amount: '10', rate: '1.5', price: 165 },
        { deviceId: 3695, name: 'jam', device_amount: '3', rate: '3.4', price: 165 },
        { deviceId: 3755, name: 'butter', device_amount: '1', rate: '1.8', price: 165 },
        { deviceId: 3759, name: 'table', device_amount: '5', rate: '5', price: 165 },
    ]
    
    const thsWithTooltip = ths.map((el, i) => {

        const myKey = uuidv4();
        let ref = (el) => (thRefs.current[i] = el);
        let toolTipInfo = {i, myRefs: thRefs, text: 'sort'};
        return <ThOrderDetailsTooltip toolTipInfo={toolTipInfo} innerRef={ref} key={myKey} data={el} />
    })

    
        // const trs = tds.map((el, i) => {
        const trs = orderDetails.orderDetails?.rows?.map((el, i) => {
            return <TrOrderDetails key={el.deviceId} data={el} />
        }) 

    return (
        
        <Modal className='modal-table' centered show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Order Detail</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {orderDetails.loading ?
                    <div className="spinner spinner__device-info">
                        <Spinner animation="border" />
                    </div> :
                    <Form.Group className="mb-3">
                        <table className='stripped-table'>
                            <thead>
                                <tr>
                                    {thsWithTooltip}
                                </tr>
                            </thead>
                            <tbody>
                                {trs}
                            </tbody>
                        </table>
                    </Form.Group>
                }
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>


    );
});

export default OrderDetail;