import React, {useContext, useEffect, useRef} from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { Context } from '../../../..';
import { v4 as uuidv4 } from 'uuid';
import TrOrderDetails from '../tableComponents/TrOrderDetails';
import ThAdminOrdersTooltip from '../tableComponents/ThAdminOrdersTooltip';

const OrderDetail = ({ show, onHide }) => {
    const {toolTip} = useContext(Context);
    let thRefs = useRef([]);
    let tdRefs = useRef([]);

    const ths = [
        {title: 'device id', sortBy: 'id'}, 
        {title: 'title', sortBy: 'name'}, 
        {title: 'amount ordered', sortBy: null}, 
        {title: 'rate', sortBy: 'rate'}, 
        {title: 'price', sortBy: 'price'}, 
    ];

    const tds = [
        ['3655', 'name f', '2', '1', '$165.00'],
        ['3657', 'name f', '7', '3', '$65.00'],
        ['3659', 'name f', '1', '4', '$25.00'],
        ['3675', 'name f', '10', '1.5', '$3.00'],
        ['3695', 'name f', '3', '3.2', '$8605.00'],
        ['3755', 'name f', '1', '1.1', '$715.00'],
        ['3759', 'name f', '5', '5', '$115.00'],
    ]

    

    const onRowClickHandler = () => {
        toolTip.setIsAvailable(false);
        toolTip.setIsToolTipShown(false);
        alert('order detail');
        toolTip.setIsAvailable(true);
    }

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
        return <ThAdminOrdersTooltip toolTipInfo={toolTipInfo} innerRef={ref} key={myKey} data={el} />
    })


    const trsWithTooltip = tds.map((el, i) => {
        const myKey = uuidv4();
        let ref = (el) => (tdRefs.current[i] = el);
        let toolTipInfo = {i, myRefs: tdRefs, text: 'click for detailed order info'};
        return <TrOrderDetails toolTipInfo={toolTipInfo} currentRef={tdRefs.current[i]} innerRef={ref} key={myKey} onRowClickHandler={onRowClickHandler} data={el} />
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
                            {trsWithTooltip}
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