import React from 'react';
import AddBulkDevices from './AddBulkDevices';
import AddSingleDevice from './AddSingleDevice copy';

const AddDevicesBarContainer = (props) => {
    return (
        <div className='addDevices__container'>
            <AddSingleDevice setAddDeviceVisible={props.setAddDeviceVisible}/>
            <AddBulkDevices/>
        </div>
    );
};

export default AddDevicesBarContainer;