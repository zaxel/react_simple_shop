import React, { useState, useRef, useContext, useEffect } from 'react';
import PaginationCont from '../../PaginationCont';
import AdminDeviceInfoModal from './modals/AdminDeviceInfoModal';
import ThAdminDevicesTooltip from './tableComponents/ThAdminDevicesTooltip';
// import Trdevices from '../tableComponents/Trdevices';
import TrDevices from './tableComponents/TrDevices';
import { v4 as uuidv4 } from 'uuid';
import { Context } from '../../..';
import { Spinner } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import Search from '../../Search';
import { fetchPage } from '../../../utils/adminDevices';

const DevicesAdminPanel = observer(() => {
  let thRefs = useRef([]);
  const { toolTip, adminDevices } = useContext(Context);
  const [deviceInfoModalVisible, setDeviceInfoModalVisible] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        await fetchPage(adminDevices);
      } catch (e) {
        console.log(e)
      }
    })()
    toolTip.setIsAvailable(true);

  }, [])

  useEffect(() => {
    fetchPage(adminDevices);
  }, [adminDevices.activePage, adminDevices.updateDataTrigger])

  const ths = [
    { title: 'id', sortBy: 'id' },
    { title: 'name', sortBy: 'name' },
    { title: 'price', sortBy: 'price' },
    { title: 'rate', sortBy: 'rate' },
    { title: 'image', sortBy: null },
    { title: 'created', sortBy: 'createdAt' },
    { title: 'type', sortBy: 'type' },
    { title: 'brand', sortBy: 'brand' },
    { title: 'descriptions', sortBy: null },
    { title: 'destroy', sortBy: null },
  ]


  const tds = [
      {id: 18, name: 'tester', price: 80, rate: 3.8, image: 'image', createdAt: '2022-05-04 20:24', type: 'toster', brand: 'samsung'},
      {id: 2, name: 'router', price: 880, rate: 4.8, image: 'image', createdAt: '2022-05-04 20:24', type: 'phone', brand: 'nokia'},
      {id: 22, name: 'fixer', price: 90, rate: 3.0, image: 'image', createdAt: '2022-05-04 20:24', type: 'tools', brand: 'nokia'},
      {id: 1, name: 'box', price: 55, rate: 4.5, image: 'image', createdAt: '2022-05-04 20:24', type: 'supply', brand: 'dell'},
      {id: 16, name: 'jam', price: 120, rate: 3.8, image: 'image', createdAt: '2022-05-04 20:24', type: 'cooking', brand: 'crook'},
      {id: 4, name: 'butter', price: 121, rate: 1.8, image: 'image', createdAt: '2022-05-04 20:24', type: 'cooking', brand: 'crook'},
      {id: 5, name: 'table', price: 30, rate: 5.0, image: 'image', createdAt: '2022-05-04 20:24', type: 'kitchen', brand: 'opera'},
      {id: 8, name: 'table', price: 180, rate: 3.1, image: 'image', createdAt: '2022-05-04 20:24', type: 'kitchen', brand: 'opera'},
      {id: 11, name: 'light', price: 220, rate: 2.4, image: 'image', createdAt: '2022-05-04 20:24', type: 'kitchen', brand: 'opera'},
      {id: 12, name: 'TV', price: 200, rate: 3.3, image: 'image', createdAt: '2022-05-04 20:24', type: 'phone', brand: 'samsung'},
      
  ]

  const onModalHideHandler = () => {
    toolTip.setIsAvailable(true);
    setDeviceInfoModalVisible(false);
  }

  const onDeviceClickHandler = () => {
    setDeviceInfoModalVisible(true);
  }

  const onSubmitSearch = async() => {
    fetchPage(adminDevices);
  }

  const thsWithTooltip = ths.map((el, i) => {

    const myKey = uuidv4();
    let ref = (el) => (thRefs.current[i] = el);
    let toolTipInfo = { i, myRefs: thRefs, text: 'sort' };
    return <ThAdminDevicesTooltip toolTipInfo={toolTipInfo} innerRef={ref} key={myKey} data={el} />
  })

  const trs = tds.map((el, i) => {
  // const trs = adminDevices.devices?.rows?.map((el, i) => {
    const row = { ...el, onDeviceClickHandler };
    return <TrDevices key={el.id} data={row} />
  })


  // if (adminDevices.loading) {
  //   return (
  //     <div className="spinner">
  //       <Spinner animation="border" />
  //     </div>
  //   )
  // }


  return (
    <div className='user-admin__main account__orders acc-orders'>
      <div>
        <Search options={[{id: 'id'}, {email: 'email'}]} store={adminDevices} onSubmitSearch={onSubmitSearch}/>
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
        <AdminDeviceInfoModal show={deviceInfoModalVisible} onHide={setDeviceInfoModalVisible} />
      </div>

      <PaginationCont currentStore={adminDevices} />
    </div>
  );
});

export default DevicesAdminPanel;