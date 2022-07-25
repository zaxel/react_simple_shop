import React from 'react';
import AddBulkDevices from './AddBulkDevices';
import AddSingleDevice from './AddSingleDevice';

const AddDevicesBarContainer = (props) => {
    return (
        <div className='addDevices__container'>
            <AddSingleDevice setAddDeviceVisible={props.setAddDeviceVisible}/>
            <AddBulkDevices setAddDeviceBulkVisible={props.setAddDeviceBulkVisible}/>
        </div>
    );
};

export default AddDevicesBarContainer;