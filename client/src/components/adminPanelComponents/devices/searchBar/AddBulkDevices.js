import React from 'react';

const AddBulkDevices = (props) => {
    return (
        <button onClick={props.setAddDeviceBulkVisible}>
            add bulk devices
        </button>
    );
};

export default AddBulkDevices;