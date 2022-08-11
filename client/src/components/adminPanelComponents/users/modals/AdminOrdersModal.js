import React, {useContext, useEffect, useRef} from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { Context } from '../../../..';
import { v4 as uuidv4 } from 'uuid';
import NavigationRowLink from './components/NavigationRowLink';
import ThAdminUserOrdersTooltip from './components/ThAdminUserOrdersTooltip';
import { fetchUserOrders } from '../../../../utils/administration/adminUserOrders';
import { Spinner } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';

const AdminOrdersModal = observer(({ show, onHide }) => {
    const {toolTip, userOrders, cart, user} = useContext(Context);
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

    const onThClickHandler = () => {
        toolTip.setIsAvailable(false);
        toolTip.setIsToolTipShown(false);
        alert('sort');
        toolTip.setIsAvailable(true);
    }

    useEffect(() => {
        fetchUserOrders(userOrders, cart, user);
    }, [userOrders.updateDataTrigger]) 




    const thsWithTooltip = ths.map((el, i) => {

        const myKey = uuidv4();
        let ref = (el) => (thRefs.current[i] = el);
        let toolTipInfo = {i, myRefs: thRefs, text: 'sort'};
        return <ThAdminUserOrdersTooltip toolTipInfo={toolTipInfo} innerRef={ref} key={myKey} data={el} />
    })


    // const trsWithTooltip = tds.map((el, i) => {
    const trsWithTooltip = userOrders.userOrders?.rows?.map((el, i) => {
        const myKey = uuidv4();
        let ref = (el) => (tdRefs.current[i] = el);
        let toolTipInfo = {i, myRefs: tdRefs, text: 'click for detailed order info'};
        return <NavigationRowLink toolTipInfo={toolTipInfo} currentRef={tdRefs.current[i]} innerRef={ref} key={myKey} data={el} />
    })

    return (
        <Modal className='modal-table' centered show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Order Detail</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            {userOrders.loading ?
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
                            {trsWithTooltip}
                        </tbody>
                    </table>
                </Form.Group>}

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>


    );
});

export default AdminOrdersModal;