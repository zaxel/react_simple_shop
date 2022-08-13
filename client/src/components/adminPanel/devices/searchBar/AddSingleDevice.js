import React from 'react';

const AddSingleDevice = (props) => {
    return (
        <button onClick={props.setAddDeviceVisible}>
            add single device
        </button>
    );
};

export default AddSingleDevice;