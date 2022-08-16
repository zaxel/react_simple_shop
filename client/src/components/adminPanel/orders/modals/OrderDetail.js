import React, {useContext, useRef, useEffect} from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { Context } from '../../../..';
import { v4 as uuidv4 } from 'uuid';
import TrOrderDetails from './components/TrOrderDetails';
import ThOrderDetailsTooltip from './components/ThOrderDetailsTooltip';
import { fetchOrderDetails } from '../../../../utils/administration/adminOrders';
import { observer } from 'mobx-react-lite';
import { Spinner } from 'react-bootstrap';
import { OrderDetailsThs as ths } from '../../../../utils/consts/thTitles';

const OrderDetail = observer(({ show, onHide }) => {
    const { orderDetails, cart, user } = useContext(Context);
    let thRefs = useRef([]); 

    useEffect(() => {
        fetchOrderDetails(orderDetails, orderDetails.orderId, cart, user);
    }, [orderDetails.updateDataTrigger])

    const thsWithTooltip = ths.map((el, i) => {
        const myKey = uuidv4();
        let ref = (el) => (thRefs.current[i] = el);
        let toolTipInfo = {i, myRefs: thRefs, text: 'sort'};
        return <ThOrderDetailsTooltip toolTipInfo={toolTipInfo} innerRef={ref} key={myKey} data={el} />
    })

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