import React, { useState, useRef, useContext, useEffect } from 'react';
import PaginationCont from '../PaginationCont';
import AdminOrdersModal from '../modalComponents/AdminOrdersModal';
import ThTooltip from './tableComponents/ThTooltip';
import TrUsers from './tableComponents/TrUsers';
import { v4 as uuidv4 } from 'uuid';
import { Context } from '../..';
import { Spinner } from 'react-bootstrap';
import { getUsers } from '../../http/userAPI';

const UsersAdminPanel = () => {
    let thRefs = useRef([]);
    let tdRefs = useRef([]);
    const { toolTip, users } = useContext(Context);
    const [orderModalVisible, setOrderModalVisible] = useState(false);
    const [loading, setLoading] = useState(true);

    const fetchAllUsers = async() => {
        const fetchedServerUsers = await getUsers('id', 'ASC', 10, 1); //sortBy, sortDirection, limit, page
        await users.setUsers(fetchedServerUsers);
        console.log(users.users.rows);
    }

    useEffect(() => {
        (async () => {
          try {
            await fetchAllUsers();
          } catch (e) {
            console.log(e)
          } finally {
            setLoading(false)
          }
        })()
        
    
      }, [])

    const ths = [
        {title: 'user id', sortBy: 'id'}, 
        {title: 'email', sortBy: 'email'}, 
        {title: 'role', sortBy: 'role'}, 
        {title: 'activated', sortBy: 'is_activated'}, 
        {title: 'registered', sortBy: 'createdAt'}, 
        {title: 'orders', sortBy: null}, 
        {title: 'destroy', sortBy: null}, 
    ]        
        

    // const tds = [
    //     {id: 18, email: 'test@gmail.com', role: 'USER', isActivated: 'true', createdAt: '2022-05-04 20:24'},
    //     {id: 22, email: 'admin@gmail.com', role: 'ADMIN', isActivated: 'true', createdAt: '2022-08-12 19:24'},
    //     {id: 56, email: 'mega_client@gmail.com', role: 'MODER', isActivated: 'true', createdAt: '2022-09-15 15:00'},
    //     {id: 75, email: 'tempemail@gmail.com', role: 'USER', isActivated: 'true', createdAt: '2022-09-15 18:15'},
    //     {id: 29, email: 'jenny9009@gmail.com', role: 'MODER', isActivated: 'true', createdAt: '2022-10-04 12:10'},
    //     {id: 11, email: 'startrack@gmail.com', role: 'USER', isActivated: 'false',createdAt:  '2022-10-04 20:24'},
    //     {id: 12, email: 'moonlight@gmail.com', role: 'USER', isActivated: 'true', createdAt: '2022-12-01 23:55'},
    // ]

    const onModalHideHandler = () => {
        toolTip.setIsAvailable(true);
        setOrderModalVisible(false);
    }

    const onOrderClickHandler = () => {
        setOrderModalVisible(true);
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

    // const trs = tds.map((el, i) => {
    const trs = users.users?.rows?.map((el, i) => {
        const row = {...el, onOrderClickHandler};
        return <TrUsers key={el.id} data={row} />
    })


    if (loading) {
        return (
          <div className="spinner">
            <Spinner animation="border" />
          </div>
        )
      }


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
                <AdminOrdersModal show={orderModalVisible} onHide={onModalHideHandler} />
                <PaginationCont currentStore={users}/>
            </div>
    );
};

export default UsersAdminPanel;