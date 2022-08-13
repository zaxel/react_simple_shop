import React, { useState, useRef, useContext, useEffect } from 'react';
import PaginationCont from '../../PaginationCont';
import AdminOrdersModal from '../users/modals/AdminOrdersModal';
import ThAdminUsersTooltip from '../users/modals/components/ThAdminUserOrdersTooltip';
import ThAdminOrdersTooltip from './tableComponents/ThAdminOrdersTooltip';
// import TrOrders from './tableComponents/TrOrders';
import TrOrders from './tableComponents/TrOrders';
import { v4 as uuidv4 } from 'uuid';
import { Context } from '../../..';
import { Spinner } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import Search from '../../Search';
import { fetchPage } from '../../../utils/administration/adminOrders';
import OrderDetail from './modals/OrderDetail';

const OrdersAdminPanel = observer(() => {
    let thRefs = useRef([]);
    const { toolTip, orders, orderDetails, cart, user } = useContext(Context);
    const [orderModalVisible, setOrderModalVisible] = useState(false);

    useEffect(() => {
        fetchPage(orders, cart, user);
           
        toolTip.setIsAvailable(true);
    }, [])

    useEffect(() => {
        fetchPage(orders, cart, user);
    }, [orders.activePage, orders.updateDataTrigger])

    const ths = [
        { title: 'order id', sortBy: 'id' },
        { title: 'ordered at', sortBy: 'createdAt' },
        { title: 'items ordered', sortBy: null },
        { title: 'user id', sortBy: 'userId' },
        { title: 'user email', sortBy: null },
        { title: 'total', sortBy: null },
        { title: 'order detail', sortBy: null },
        { title: 'destroy', sortBy: null },
    ]


    const tds = [
        { id: 18, createdAt: 1519211809934, ordered: 23, userId: 18, email: 'test@gmail.com', },
        { id: 22, createdAt: 1519211810362, ordered: 6, userId: 22, email: 'admin@gmail.com', },
        { id: 56, createdAt: 1519211811670, ordered: 13, userId: 56, email: 'mega_client@gmail.com', },
        { id: 75, createdAt: 1519211809934, ordered: 1, userId: 75, email: 'tempemail@gmail.com', },
        { id: 29, createdAt: 1519129853500, ordered: 1, userId: 29, email: 'jenny9009@gmail.com', },
        { id: 11, createdAt: 1519129858900, ordered: 2, userId: 11, email: 'startrack@gmail.com', },
        { id: 12, createdAt: 1519129864400, ordered: 4, userId: 12, email: 'moonlight@gmail.com', },
    ]

    const onModalHideHandler = () => {
        toolTip.setIsAvailable(true);
        setOrderModalVisible(false);
        orderDetails.setOrderId(null);
    }

    const onOrderClickHandler = (orderId) => {
        orderDetails.setOrderId(orderId);
        setOrderModalVisible(true);
        orderDetails.setUpdateDataTrigger(!orderDetails.updateDataTrigger);
    }

    const onSubmitSearch = async () => {
        fetchPage(orders, cart, user);
    }

    const thsWithTooltip = ths.map((el, i) => {

        const myKey = uuidv4();
        let ref = (el) => (thRefs.current[i] = el);
        let toolTipInfo = { i, myRefs: thRefs, text: 'sort' };
        return <ThAdminOrdersTooltip toolTipInfo={toolTipInfo} innerRef={ref} key={myKey} data={el} />
    })

    // const trs = tds.map((el, i) => {
    const trs = orders.orders?.rows?.map((el, i) => {
        const row = { ...el, onOrderClickHandler };
        return <TrOrders key={el.id} data={row} />
    })


    if (orders.loading) {
        return (
            <div className="spinner">
                <Spinner animation="border" />
            </div>
        )
    }


    return (
        <div className='user-admin__main account__orders acc-orders'>
            <div>
                <Search options={[{id: 'order id'}, {userId : 'user id'}]} store={orders} onSubmitSearch={onSubmitSearch} />
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
                <OrderDetail show={orderModalVisible} onHide={onModalHideHandler} />
            </div>

            <PaginationCont currentStore={orders} />
        </div>
    );
});

export default OrdersAdminPanel;