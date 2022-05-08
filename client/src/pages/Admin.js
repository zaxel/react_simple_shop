import React, { useState } from 'react';
import TypeModal from '../components/modalComponents/TypeModal';
import BrandModal from '../components/modalComponents/BrandModal';
import DeviceModal from '../components/modalComponents/DeviceModal';
import DeviceBulkModal from '../components/modalComponents/DeviceBulkModal';

const Admin = () => {
    const [typeVisible, setTypeVisible] = useState(false);
    const [brandVisible, setBrandVisible] = useState(false);
    const [deviceVisible, setDeviceVisible] = useState(false);
    const [deviceBulkVisible, setDeviceBulkVisible] = useState(false);
    return (
        <div className='admin'>
            <div className='admin__container'>
                <button onClick={()=>setTypeVisible(true)} className='btn btn-outline-light auth__button device__button data-bs-toggle="modal"'>add type</button>
                <button onClick={()=>setBrandVisible(true)} className='btn btn-outline-light auth__button device__button'>add brand</button>
                <button onClick={()=>setDeviceVisible(true)} className='btn btn-outline-light auth__button device__button'>add device</button>
                <button onClick={()=>setDeviceBulkVisible(true)} className='btn btn-outline-light auth__button device__button'>add bulk</button>
                <TypeModal show={typeVisible} onHide={()=>setTypeVisible(false)}/>
                <BrandModal show={brandVisible} onHide={()=>setBrandVisible(false)}/>
                <DeviceModal show={deviceVisible} onHide={()=>setDeviceVisible(false)}/>
                <DeviceBulkModal show={deviceBulkVisible} onHide={()=>setDeviceBulkVisible(false)}/>
            </div>
        </div>
    );
};

export default Admin;