import React, {useState} from 'react';
import PaginationCont from '../PaginationCont';
import UserOrderModal from '../modalComponents/UserOrderModal';

const UserOrders = () => {
    const [orderModalVisible, setOrderModalVisible] = useState(false);

    return (
        <div className='account__orders acc-orders'>
            <table className='stripped-table'>
                <tr>
                    <th>order id</th>
                    <th>ordered at</th>
                    <th>amount ordered</th>
                    <th>total</th>
                </tr>
                <tr onClick={()=>setOrderModalVisible(true)}>
                    <td>3655</td>
                    <td>2022-05-04 20:24</td>
                    <td>1</td>
                    <td>$365.00</td>
                </tr>
                <tr>
                    <td>3655</td>
                    <td>2022-05-04 20:24</td>
                    <td>2</td>
                    <td>$200.00</td>
                </tr>
                <tr>
                    <td>3655</td>
                    <td>2022-05-04 20:24</td>
                    <td>1</td>
                    <td>$155.00</td>
                </tr>
                <tr>
                    <td>3655</td>
                    <td>2022-05-04 20:24</td>
                    <td>4</td>
                    <td>$30.00</td>
                </tr>
                <tr>
                    <td>3775</td>
                    <td>2022-05-04 20:24</td>
                    <td>1</td>
                    <td>$15.00</td>
                </tr>
                <tr>
                    <td>3895</td>
                    <td>2022-05-04 20:24</td>
                    <td>5</td>
                    <td>$5.00</td>
                </tr>
            </table>
            <UserOrderModal show={orderModalVisible} onHide={()=>setOrderModalVisible(false)}/>
            <PaginationCont />
        </div>
    );
};

export default UserOrders;