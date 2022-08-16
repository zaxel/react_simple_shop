import React, { useState, useRef, useContext, useEffect } from 'react';
import PaginationCont from '../../PaginationCont';
import AdminOrdersModal from './modals/AdminOrdersModal';
import ThAdminUsersTooltip from './tableComponents/ThAdminUsersTooltip';
import TrUsers from './tableComponents/TrUsers';
import { v4 as uuidv4 } from 'uuid';
import { Context } from '../../..';
import { Spinner } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import Search from '../../Search';
import { fetchPage } from '../../../utils/administration/adminUsers';
import { UsersThs as ths } from '../../../utils/consts/thTitles';

const UsersAdminPanel = observer(() => {
  let thRefs = useRef([]);
  const { toolTip, userOrders, users, cart, user } = useContext(Context);
  const [orderModalVisible, setOrderModalVisible] = useState(false);

  useEffect(() => {
    fetchPage(users, cart, user);
    toolTip.setIsAvailable(true);
  }, [])

  useEffect(() => {
    fetchPage(users, cart, user);
  }, [users.activePage, users.updateDataTrigger])

  const onModalHideHandler = () => {
    toolTip.setIsAvailable(true);
    setOrderModalVisible(false);
  }

  const onOrderClickHandler = (userId) => {
    userOrders.setSearchByPrase(userId);
    setOrderModalVisible(true);
    userOrders.setUpdateDataTrigger(!userOrders.updateDataTrigger);
  }

  const onSubmitSearch = async() => {
    fetchPage(users, cart, user); 
  }

  const thsWithTooltip = ths.map((el, i) => {
    const myKey = uuidv4();
    let ref = (el) => (thRefs.current[i] = el);
    let toolTipInfo = { i, myRefs: thRefs, text: 'sort' };
    return <ThAdminUsersTooltip toolTipInfo={toolTipInfo} innerRef={ref} key={myKey} data={el} />
  })

  const trs = users.users?.rows?.map((el, i) => {
    const row = { ...el, onOrderClickHandler };
    return <TrUsers key={el.id} data={row} />
  })

  if (users.loading) {
    return (
      <div className="spinner">
        <Spinner animation="border" />
      </div>
    )
  }
  return (
    <div className='user-admin__main account__orders acc-orders'>
      <div>
        <Search options={[{id: 'id'}, {email: 'email'}]} store={users} onSubmitSearch={onSubmitSearch}/>
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
      </div>
      <PaginationCont currentStore={users} />
    </div>
  );
});

export default UsersAdminPanel;