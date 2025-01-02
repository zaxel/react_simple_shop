import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Context } from '../..';
import DeviceItem from './DeviceItem';

const DeviceItems = observer(() => {
    const {device} = useContext(Context);
    return (
        <div className='devices'>
            {device?.devices?.rows?.map(device => 
                <DeviceItem key={device.id} device={device}/>    
            )}
        </div>
    );
});

export default DeviceItems;