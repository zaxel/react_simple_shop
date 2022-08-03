import React, {useContext, useEffect, useRef} from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { Context } from '../../../..';
import { v4 as uuidv4 } from 'uuid';
import TrUsersOrders from '../tableComponents/TrUsersOrders';
import ThAdminUsersTooltip from '../tableComponents/ThAdminUsersTooltip';

const AdminOrdersModal = ({ show, onHide }) => {
    const {toolTip} = useContext(Context);
    let thRefs = useRef([]);
    let tdRefs = useRef([]);

    const ths = [
        {title: 'order id', sortBy: 'id'}, 
        {title: 'ordered at', sortBy: 'createdAt'}, 
        {title: 'amount ordered', sortBy: null}, 
        {title: 'total', sortBy: null}, 
    ];

    const tds = [
        ['3655', '2022-05-04 20:24', '2', '$165.00'],
        ['3657', '2022-08-12 19:24', '7', '$65.00'],
        ['3659', '2022-09-15 15:00', '1', '$25.00'],
        ['3675', '2022-09-15 18:15', '10', '$3.00'],
        ['3695', '2022-10-04 12:10', '3', '$8605.00'],
        ['3755', '2022-10-04 20:24', '1', '$715.00'],
        ['3759', '2022-12-01 23:55', '5', '$115.00'],
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
        return <ThAdminUsersTooltip toolTipInfo={toolTipInfo} innerRef={ref} key={myKey} data={el} />
    })


    const trsWithTooltip = tds.map((el, i) => {
        const myKey = uuidv4();
        let ref = (el) => (tdRefs.current[i] = el);
        let toolTipInfo = {i, myRefs: tdRefs, text: 'click for detailed order info'};
        return <TrUsersOrders toolTipInfo={toolTipInfo} currentRef={tdRefs.current[i]} innerRef={ref} key={myKey} onRowClickHandler={onRowClickHandler} data={el} />
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

export default AdminOrdersModal;