import React, { useState, useRef, useContext, useEffect } from 'react';
import PaginationCont from '../PaginationCont';
import UserOrderModal from '../modalComponents/UserOrderModal';
import ThTooltip from './tableComponents/ThTooltip';
import TrUsers from './tableComponents/TrUsers';
import { v4 as uuidv4 } from 'uuid';
import { Context } from '../..';

const UsersAdminPanel = () => {
    let thRefs = useRef([]);
    let tdRefs = useRef([]);
    const { toolTip } = useContext(Context);
    const [orderModalVisible, setOrderModalVisible] = useState(false);

    const ths = [
        {title: 'user id', sortBy: 'id'}, 
        {title: 'email', sortBy: 'email'}, 
        {title: 'role', sortBy: 'role'}, 
        {title: 'activated', sortBy: 'is_activated'}, 
        {title: 'registered', sortBy: 'createdAt'}, 
        {title: 'orders', sortBy: null}, 
        {title: 'destroy', sortBy: null}, 
    ]        
        

    const tds = [
        ['18', 'test@gmail.com', 'USER', 'true', '2022-05-04 20:24'],
        ['22', 'admin@gmail.com', 'ADMIN', 'true', '2022-08-12 19:24'],
        ['56', 'mega_client@gmail.com', 'MODER', 'true', '2022-09-15 15:00'],
        ['75', 'tempemail@gmail.com', 'USER', 'true', '2022-09-15 18:15'],
        ['29', 'jenny9009@gmail.com', 'MODER', 'true', '2022-10-04 12:10'],
        ['11', 'startrack@gmail.com', 'USER', 'false', '2022-10-04 20:24'],
        ['12', 'moonlight@gmail.com', 'USER', 'true', '2022-12-01 23:55'],
    ]

    const onModalHideHandler = () => {
        toolTip.setIsAvailable(true);
        setOrderModalVisible(false);
    }

    useEffect(() => {
        toolTip.setIsAvailable(true);
    }, [])

    const thsWithTooltip = ths.map((el, i) => {

        const myKey = uuidv4();
        let ref = (el) => (thRefs.current[i] = el);
        let toolTipInfo = {i, myRefs: thRefs, text: 'sort'};
        return <ThTooltip toolTipInfo={toolTipInfo} innerRef={ref} key={myKey} data={el} />
    })

    const trs = tds.map((el, i) => {
        return <TrUsers key={el[0]} data={el} />
    })
    return (
            <div className='user-admin__main account__orders acc-orders'>
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
                <UserOrderModal show={orderModalVisible} onHide={onModalHideHandler} />
                <PaginationCont />
            </div>
    );
};

export default UsersAdminPanel;