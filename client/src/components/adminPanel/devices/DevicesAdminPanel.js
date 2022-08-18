import React, { useState, useRef, useContext, useEffect } from 'react';
import PaginationCont from '../../PaginationCont';
import AdminDeviceInfoModal from './modals/AdminDeviceInfoModal';
import ThAdminDevicesTooltip from './tableComponents/ThAdminDevicesTooltip';
import TrDevices from './tableComponents/TrDevices';
import { v4 as uuidv4 } from 'uuid';
import { Context } from '../../..';
import { Spinner } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import Search from '../../Search';
import { fetchPage, fetchSetTypes, fetchSetBrands } from '../../../utils/administration/adminDevices';
import { fetchInfo } from '../../../utils/administration/adminDeviceInfo';
import AddDevicesBarContainer from './searchBar/AddDevicesBarContainer';
import AddDeviceModal from './modals/AddDeviceModal';
import AddDeviceBulkModal from './modals/AddDeviceBulkModal';
import { setDataToStore } from '../../../utils/administration/common';
import { DevicesThs as ths } from '../../../utils/consts/thTitles';

const DevicesAdminPanel = observer(() => {
  let thRefs = useRef([]);
  const { toolTip, adminDevices, adminDevicesInfo, cart, user } = useContext(Context);
  const [deviceInfoModalVisible, setDeviceInfoModalVisible] = useState(false);
  const [addDeviceVisible, setAddDeviceVisible] = useState(false);
  const [addDeviceBulkVisible, setAddDeviceBulkVisible] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        fetchSetTypes(adminDevices);
        fetchSetBrands(adminDevices);
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

  const onModalHideHandler = () => {
    toolTip.setIsAvailable(true);
    setDeviceInfoModalVisible(false);
  }

  const onDescriptionClickHandler = async (deviceId) => {
    setDeviceInfoModalVisible(true);
    adminDevicesInfo.setDeviceId(deviceId);
    const fetchedInfo = await fetchInfo(adminDevicesInfo, deviceId, null, null, cart, user)
    if (fetchedInfo.loggedOut) return;
    await setDataToStore(adminDevicesInfo, 'setInfo', fetchedInfo);
  }

  const onSubmitSearch = async () => {
    fetchPage(adminDevices);
  }

  const thsWithTooltip = ths.map((el, i) => {
    const myKey = uuidv4();
    let ref = (el) => (thRefs.current[i] = el);
    let toolTipInfo = { i, myRefs: thRefs, text: 'sort' };
    return <ThAdminDevicesTooltip toolTipInfo={toolTipInfo} innerRef={ref} key={myKey} data={el} />
  })

  const trs = adminDevices.devices.count ?
    adminDevices.devices?.rows?.map((el, i) => {
      const row = { ...el, onDescriptionClickHandler: onDescriptionClickHandler.bind(this, el.id) };
      return <TrDevices key={el.id} data={row} />
    }) :
    <tr className='td-active text-danger'><td>Nothing found!</td></tr>

  if (adminDevices.loading) {
    return (
      <div className="spinner">
        <Spinner animation="border" />
      </div>
    )
  }
  return (
    <div className='user-admin__main account__orders acc-orders'>
      <div>
        <div className='account__search-cont'>
          <Search options={[{ id: 'id' }, { name: 'name' }, { price: 'price' }]} store={adminDevices} onSubmitSearch={onSubmitSearch} />
          <AddDevicesBarContainer setAddDeviceVisible={setAddDeviceVisible} setAddDeviceBulkVisible={setAddDeviceBulkVisible} />
        </div>
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
        <AdminDeviceInfoModal show={deviceInfoModalVisible} onHide={onModalHideHandler} />
        <AddDeviceModal show={addDeviceVisible} onHide={() => setAddDeviceVisible(false)} />
        <AddDeviceBulkModal show={addDeviceBulkVisible} onHide={() => setAddDeviceBulkVisible(false)} />
      </div>

      <PaginationCont currentStore={adminDevices} />
    </div>
  );
});

export default DevicesAdminPanel;