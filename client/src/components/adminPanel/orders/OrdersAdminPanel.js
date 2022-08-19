import React, { useState, useRef, useContext, useEffect } from 'react';
import PaginationCont from '../../PaginationCont';
import ThAdminOrdersTooltip from './tableComponents/ThAdminOrdersTooltip';
import TrOrders from './tableComponents/TrOrders';
import { v4 as uuidv4 } from 'uuid';
import { Context } from '../../..';
import { Spinner } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import Search from '../../Search';
import { fetchPage } from '../../../utils/administration/adminOrders';
import OrderDetail from './modals/OrderDetail';
import { OrderThs as ths } from '../../../utils/consts/thTitles';
import { useSearchParams } from 'react-router-dom';
import { getQueryParamsString, setQueryParamsString } from '../../../utils/http/queryParams';

const OrdersAdminPanel = observer(() => {
    let thRefs = useRef([]);
    const { toolTip, orders, orderDetails, cart, user } = useContext(Context);
    const [orderModalVisible, setOrderModalVisible] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        getQueryParamsString(searchParams, orders);
        fetchPage(orders, cart, user);
        toolTip.setIsAvailable(true);
    }, [])

    useEffect(() => {
        setQueryParamsString(setSearchParams, orders);
        fetchPage(orders, cart, user);
    }, [orders.activePage, orders.updateDataTrigger])

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
        return <ThAdminOrdersTooltip toolTipInfo={toolTipInfo} innerRef={ref} key={myKey} data={el} setSearchParams={setSearchParams}/>
    })

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