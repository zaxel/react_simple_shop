import React, { useState, useRef, useContext, useEffect } from 'react';
import PaginationCont from '../PaginationCont';
import UserOrderModal from '../modalComponents/UserOrderModal';
import ThTable from './usersPanelTable/ThTable';
import TrTable from '../strippedTablesComponents/TrTable';
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
        {title: 'user id', sortBy: null}, 
    ]        
        

    const tds = [
        ['18', 'test@gmail.com', 'USER', 'true', '2022-05-04 20:24', 'orders'],
        ['22', 'admin@gmail.com', 'ADMIN', 'true', '2022-08-12 19:24', 'orders'],
        ['56', 'mega_client@gmail.com', 'MODER', 'true', '2022-09-15 15:00', 'orders'],
        ['75', 'tempemail@gmail.com', 'USER', 'true', '2022-09-15 18:15', 'orders'],
        ['29', 'jenny9009@gmail.com', 'MODER', 'true', '2022-10-04 12:10', 'orders'],
        ['11', 'startrack@gmail.com', 'USER', 'false', '2022-10-04 20:24', 'orders'],
        ['12', 'moonlight@gmail.com', 'USER', 'true', '2022-12-01 23:55', 'orders'],
    ]

    const onRowClickHandler = () => {
        toolTip.setIsAvailable(true);
        setOrderModalVisible(true);
        toolTip.setIsToolTipShown(false);
        toolTip.setIsAvailable(false);
    }
    

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
        return <ThTable text={'sort'} iteration={i} myRefs={thRefs} innerRef={ref} key={myKey} data={el} />
    })
    const tdsWithTooltip = tds.map((el, i) => {

        const myKey = uuidv4();
        let ref = (el) => (tdRefs.current[i] = el);
        return <TrTable text={'click for detailed info'} iteration={i} myRefs={tdRefs} currentRef={tdRefs.current[i]} innerRef={ref} key={myKey} onRowClickHandler={onRowClickHandler} data={el} />
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
                        {tdsWithTooltip}
                    </tbody>
                </table>
                <UserOrderModal show={orderModalVisible} onHide={onModalHideHandler} />
                <PaginationCont />
            </div>
    );
};

export default UsersAdminPanel;