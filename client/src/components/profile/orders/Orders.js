import React, { useContext, useEffect, useMemo, useState } from 'react';
import { DataTable } from './Data-Table';
import { columnsOrders, columnsDetails } from './columns';
import { Button } from '../../../shadcn/button';
import useFetch from '../../../utils/http/useFetch';
import { Context } from '../../..';
import ErrorBox from '../../ErrorBox';


const ordersUrl = "api/order/history";
const orderDetailsUrl = "api/order/details/";

const Orders = () => {
    const [orderDetailsId, setOrderDetailsId] = useState(null);
    const { user } = useContext(Context);
    const userId = user.user?.id;

    const [orders, setOrders] = useState({
        "count": 0,
        "rows": []
    });

    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });

    const [sorting, setSorting] = useState([
        { id: 'createdAt', desc: true } // Default sort
    ]);

    const params = useMemo(() => ({
        sortBy: sorting[0]?.id ?? "createdAt",
        sortDirection: sorting[0]?.desc ? "DESC" : "ASC",
        limit: pagination.pageSize,
        page: pagination.pageIndex + 1,
        searchBy: !orderDetailsId ? "userId" : undefined,
        searchPhrase: !orderDetailsId && userId,
    }), [sorting, pagination.pageSize, pagination.pageIndex, orderDetailsId, userId]);

    const url = useMemo(() => {
        return orderDetailsId ? `${orderDetailsUrl}${orderDetailsId}` : ordersUrl;
    }, [orderDetailsId]);

    const columns = useMemo(() => {
        return orderDetailsId ? columnsDetails : columnsOrders;
    }, [orderDetailsId]);


    const { data, error, isLoading } = useFetch(url, { params }, true);
    const setOrderDetailsHandler = (orderId) => {
        setOrders({
            "count": 0,
            "rows": []
        });
        setOrderDetailsId(orderId);
        setPagination({ pageIndex: 0, pageSize: 10 });
        setSorting([{ id: 'createdAt', desc: true }]);
    }

    useEffect(() => {
        if (!data) return; 
        setOrders(data);
    }, [data]);

    if (!userId) return null;
    if (error)
        return <ErrorBox error={error}/>

    return (
        <div className=''>
            <div className='px-4 py-2 mb-8 bg-primary-foreground rounded-lg flex justify-between items-center flex-wrap'>
                <h1 className='font-semibold mb-4 '>{!orderDetailsId
                    ? "Your Orders"
                    : `Order № ${orderDetailsId} details`}</h1>
                {orderDetailsId && <Button variant="default" onClick={() => setOrderDetailsHandler(null)}>Back to orders</Button>}
            </div>
            <DataTable
                data={orders.rows} columns={columns} orderDetailsId={orderDetailsId}
                setOrderDetailsId={setOrderDetailsHandler} totalCount={orders.count}
                limit={pagination.pageSize} pagination={pagination} setPagination={setPagination}
                sorting={sorting} setSorting={setSorting} isLoading={isLoading}
            />
        </div>
    );
};

export default Orders;