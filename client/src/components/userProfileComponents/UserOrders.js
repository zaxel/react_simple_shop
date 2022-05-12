import React, { useState, useRef, useContext } from 'react';
import PaginationCont from '../PaginationCont';
import UserOrderModal from '../modalComponents/UserOrderModal';
import ThTable from './strippedTablesComponents/ThTable';
import TrTable from './strippedTablesComponents/TrTable';
import { v4 as uuidv4 } from 'uuid';
import { Context } from '../..';


const UserOrders = () => {
    const {toolTip} = useContext(Context);
    const [orderModalVisible, setOrderModalVisible] = useState(false);

    const ths = ['order id', 'ordered at', 'amount ordered', 'total'];

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
        setOrderModalVisible(true);
        toolTip.setIsToolTipShown(false);
    }

    let thRefs = useRef([]);
    let tdRefs = useRef([]);

    const thsWithTooltip = ths.map((el, i) => {

        const myKey = uuidv4();
        let ref = (el) => (thRefs.current[i] = el);
        return <ThTable text={'click arrows to sort'} iteration={i} myRefs={thRefs} innerRef={ref} key={myKey} data={el} />
    })
    const tdsWithTooltip = tds.map((el, i) => {

        const myKey = uuidv4();
        let ref = (el) => (tdRefs.current[i] = el);
        return <TrTable text={'click for detailed info'} iteration={i} myRefs={tdRefs} currentRef={tdRefs.current[i]} innerRef={ref} key={myKey} onRowClickHandler={onRowClickHandler} data={el} />
    })

    return (
        <div className='account__orders acc-orders'>

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
            <UserOrderModal show={orderModalVisible} onHide={() => setOrderModalVisible(false)} />
            <PaginationCont />
        </div>
    );
};

export default UserOrders;