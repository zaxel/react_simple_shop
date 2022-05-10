import React, { useState } from 'react';
import PaginationCont from '../PaginationCont';
import UserOrderModal from '../modalComponents/UserOrderModal';
import TrThead from '../modalComponents/strippedTablesComponents/ThThead';
import TrTable from '../modalComponents/strippedTablesComponents/TrTable';

const UserOrders = () => {
    const [orderModalVisible, setOrderModalVisible] = useState(false);
    
    const ths = ['order id', 'ordered at', 'amount ordered', 'total'];

    const tds1 = ['3655', '2022-05-04 20:24', '2', '$165.00'];
    const tds2 = ['3657', '2022-08-12 19:24', '7', '$65.00'];
    const tds3 = ['3659', '2022-09-15 15:00', '1', '$25.00'];
    const tds4 = ['3675', '2022-09-15 18:15', '10', '$3.00'];
    const tds5 = ['3695', '2022-10-04 12:10', '3', '$8605.00'];
    const tds6 = ['3755', '2022-10-04 20:24', '1', '$715.00'];
    const tds7 = ['3759', '2022-12-01 23:55', '5', '$115.00'];

    const onRowClickHandler = () => {
        setOrderModalVisible(true)
    }

    return (
        <div className='account__orders acc-orders'>
            
            <table className='stripped-table'>
                <thead>
                    <TrThead data={ths}/>
                </thead>
                <tbody>
                    <TrTable onRowClickHandler={onRowClickHandler} data={tds1}/>
                    <TrTable onRowClickHandler={onRowClickHandler} data={tds2}/>
                    <TrTable onRowClickHandler={onRowClickHandler} data={tds3}/>
                    <TrTable onRowClickHandler={onRowClickHandler} data={tds4}/>
                    <TrTable onRowClickHandler={onRowClickHandler} data={tds5}/>
                    <TrTable onRowClickHandler={onRowClickHandler} data={tds6}/>
                    <TrTable onRowClickHandler={onRowClickHandler} data={tds7}/>
                    
                </tbody>
            </table>
            <UserOrderModal show={orderModalVisible} onHide={() => setOrderModalVisible(false)} />
            <PaginationCont />
        </div>
    );
};

export default UserOrders;