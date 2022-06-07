import React, { useState, useRef, useContext, useEffect } from 'react';
import PaginationCont from '../PaginationCont';
import AdminOrdersModal from '../modalComponents/AdminOrdersModal';
import ThTooltip from './tableComponents/ThTooltip';
import TrUsers from './tableComponents/TrUsers';
import { v4 as uuidv4 } from 'uuid';
import { Context } from '../..';
import { Spinner } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import Search from '../Search';
import { fetchPage } from '../../utils/adminUsers';

const OrdersAdminPanel = observer(() => {
  let thRefs = useRef([]);
  const { toolTip, orders } = useContext(Context);

  useEffect(() => {
    (async () => {
      try {
        await fetchPage(orders);
      } catch (e) {
        console.log(e)
      }
    })()
    toolTip.setIsAvailable(true);

  }, [])

  useEffect(() => {
    fetchPage(orders);
  }, [orders.activePage, orders.updateDataTrigger])

  const ths = [
    { title: 'order id', sortBy: 'id' },
    { title: 'ordered at', sortBy: 'createdAt' },
    { title: 'items ordered', sortBy: null },
    { title: 'user id', sortBy: 'userId' },
    { title: 'user email', sortBy: null },
    { title: 'activated', sortBy: 'is_activated' },
    { title: 'order detail', sortBy: null },
    { title: 'destroy', sortBy: null },
  ]


  // const tds = [
  //     {id: 18, email: 'test@gmail.com', role: 'USER', isActivated: 'true', createdAt: '2022-05-04 20:24'},
  //     {id: 22, email: 'admin@gmail.com', role: 'ADMIN', isActivated: 'true', createdAt: '2022-08-12 19:24'},
  //     {id: 56, email: 'mega_client@gmail.com', role: 'MODERATOR', isActivated: 'true', createdAt: '2022-09-15 15:00'},
  //     {id: 75, email: 'tempemail@gmail.com', role: 'USER', isActivated: 'true', createdAt: '2022-09-15 18:15'},
  //     {id: 29, email: 'jenny9009@gmail.com', role: 'MODERATOR', isActivated: 'true', createdAt: '2022-10-04 12:10'},
  //     {id: 11, email: 'startrack@gmail.com', role: 'USER', isActivated: 'false',createdAt:  '2022-10-04 20:24'},
  //     {id: 12, email: 'moonlight@gmail.com', role: 'USER', isActivated: 'true', createdAt: '2022-12-01 23:55'},
  // ]

  const onModalHideHandler = () => {
    toolTip.setIsAvailable(true);
    // setOrderModalVisible(false);
  }

  const onOrderClickHandler = () => {
    // setOrderModalVisible(true);
  }

  const onSubmitSearch = async() => {
    fetchPage(orders);
  }

  const thsWithTooltip = ths.map((el, i) => {

    const myKey = uuidv4();
    let ref = (el) => (thRefs.current[i] = el);
    let toolTipInfo = { i, myRefs: thRefs, text: 'sort' };
    return <ThTooltip toolTipInfo={toolTipInfo} innerRef={ref} key={myKey} data={el} />
  })

  // const trs = tds.map((el, i) => {
  const trs = orders.orders?.rows?.map((el, i) => {
    const row = { ...el, onOrderClickHandler };
    return <TrUsers key={el.id} data={row} />
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
        <Search options={['id', 'email']} store={orders} onSubmitSearch={onSubmitSearch}/>
        <table className='stripped-table'>
          <thead>
            <tr>
              {thsWithTooltip}
            </tr>
          </thead>
          <tbody>
            {/* {trs} */}
          </tbody>
        </table>
      </div>

      <PaginationCont currentStore={orders} />
    </div>
  );
});

export default OrdersAdminPanel;