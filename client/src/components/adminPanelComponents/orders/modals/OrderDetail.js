import React, {useContext, useRef} from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { Context } from '../../../..';
import { v4 as uuidv4 } from 'uuid';
import TrOrderDetails from './components/TrOrderDetails';
import ThOrderDetailsTooltip from './components/ThOrderDetailsTooltip';

const OrderDetail = ({ show, onHide }) => {
    const {toolTip} = useContext(Context);
    let thRefs = useRef([]);

    const ths = [
        {title: 'device id', sortBy: 'id'}, 
        {title: 'title', sortBy: 'name'}, 
        {title: 'amount ordered', sortBy: null}, 
        {title: 'rate', sortBy: 'rate'}, 
        {title: 'price', sortBy: 'price/item'}, 
    ];

    const tds = [
        { deviceId: 3655, title: 'tester', device_amount: '2', rate: '1', price: 165},
        { deviceId: 3657, title: 'router', device_amount: '7', rate: '3', price: 165 },
        { deviceId: 3659, title: 'fixer', device_amount: '1', rate: '4', price: 165 },
        { deviceId: 3675, title: 'box', device_amount: '10', rate: '1.5', price: 165 },
        { deviceId: 3695, title: 'jam', device_amount: '3', rate: '3.4', price: 165 },
        { deviceId: 3755, title: 'butter', device_amount: '1', rate: '1.8', price: 165 },
        { deviceId: 3759, title: 'table', device_amount: '5', rate: '5', price: 165 },
    ]
        


    const onThClickHandler = () => {
        toolTip.setIsAvailable(false);
        toolTip.setIsToolTipShown(false);
        alert('sort');
        toolTip.setIsAvailable(true);
    }

    

    const thsWithTooltip = ths.map((el, i) => {

        const myKey = uuidv4();
        let ref = (el) => (thRefs.current[i] = el);
        let toolTipInfo = {i, myRefs: thRefs, text: 'sort'};
        return <ThOrderDetailsTooltip toolTipInfo={toolTipInfo} innerRef={ref} key={myKey} data={el} />
    })

    const trs = tds.map((el, i) => {
        // const trs = adminDevicesInfo.info?.rows?.map((el, i) => {
            return <TrOrderDetails key={el.deviceId} data={el} />
        })

    return (
        <Modal className='modal-table' centered show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Order Detail</Modal.Title>
            </Modal.Header>
            <Modal.Body>

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

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>


    );
};

export default OrderDetail;