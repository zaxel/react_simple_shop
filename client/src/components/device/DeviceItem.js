import React from 'react';
import star from '../../assets/rating_star.png';
import { useNavigate } from "react-router-dom";
import { DEVICE_ROUTE } from '../../utils/consts/routes';
import no_image from '../../assets/no-image.jpg';
import { formatGbCurrency } from '../../utils/dataFormat/currencies';
import RateItem from './RateItem';

const DeviceItem = ({device}) => {
    const navigate = useNavigate();
    return ( 
        <li className = 'deviceItem'>
            <div className = 'deviceItem__image-cont' onClick={()=>navigate(DEVICE_ROUTE + '/' + device.id)} >
                <img src = { device.img?.[0]?.url || no_image } alt = {device.name} />
            </div> 
            <div className='deviceItem__info-cont'>
                <h4 className = 'deviceItem__title' onClick={()=>navigate(DEVICE_ROUTE + '/' + device.id)} >{device.name}</h4> 
                <h3 className = 'deviceItem__price'>{formatGbCurrency(device.price)}</h3>
                <div className = 'deviceItem__rating-cont'>
                    <RateItem rate={device.rate}/>
                </div>
            </div>
        </li >
    );
};

export default DeviceItem;