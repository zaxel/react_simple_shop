import React, {useContext, useEffect, useRef} from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { Context } from '../../../..';
import { v4 as uuidv4 } from 'uuid';
import NavigationRowLink from './components/NavigationRowLink';
import ThAdminUserOrdersTooltip from './components/ThAdminUserOrdersTooltip';
import { fetchUserOrders } from '../../../../utils/administration/adminUserOrders';
import { Spinner } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { UserOrdersThs as ths } from '../../../../utils/consts/thTitles';

const AdminOrdersModal = observer(({ show, onHide }) => {
    const { userOrders, cart, user} = useContext(Context);
    let thRefs = useRef([]);
    let tdRefs = useRef([]);

    useEffect(() => {
        fetchUserOrders(userOrders, cart, user);
    }, [userOrders.updateDataTrigger]) 

    const thsWithTooltip = ths.map((el, i) => {
        const myKey = uuidv4();
        let ref = (el) => (thRefs.current[i] = el);
        let toolTipInfo = {i, myRefs: thRefs, text: 'sort'};
        return <ThAdminUserOrdersTooltip toolTipInfo={toolTipInfo} innerRef={ref} key={myKey} data={el} />
    })

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