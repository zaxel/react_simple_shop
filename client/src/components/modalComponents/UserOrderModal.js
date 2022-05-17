import React, {useContext, useEffect, useRef} from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { Context } from '../..';
import { v4 as uuidv4 } from 'uuid';
import ThTable from '../strippedTablesComponents/ThTable';
import TrTable from '../strippedTablesComponents/TrTable';

const UserOrderModal = ({ show, onHide }) => {
    const {toolTip} = useContext(Context);
    let thRefs = useRef([]);
    let tdRefs = useRef([]);

    const ths = ['device', 'amount ordered', 'rating', 'price'];

    const tds = [
        ['Siemens * M', '1', '4.2', '$165.00'],
        ['Samsung * m', '2', '2.5', '$200.00'],
        ['Samsung * 8lqvZ2k', '1', '5.0', '$155.00'],
        ['Nokia 8998', '2', '4.2', '$30.00'],
        ['LG -- 3775', '5', '3.5', '$15.00'],
        ['Nokia 45885', '1', '4.7', '$5.00'],
    ]

    

    const onRowClickHandler = () => {
        toolTip.setIsAvailable(false);
        toolTip.setIsToolTipShown(false);
        alert('item detail');
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
        return <ThTable text={'sort'} iteration={i} myRefs={thRefs} innerRef={ref} key={myKey} onThClickHandler={onThClickHandler} data={el} />
    })
    const tdsWithTooltip = tds.map((el, i) => {
        const myKey = uuidv4();
        let ref = (el) => (tdRefs.current[i] = el);
        return <TrTable text={'click for detailed device info'} iteration={i} myRefs={tdRefs} currentRef={tdRefs.current[i]} innerRef={ref} key={myKey} onRowClickHandler={onRowClickHandler} data={el} />
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
                            {tdsWithTooltip}
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

export default UserOrderModal;