import React from 'react';
import star from '../assets/rating_star.png';
import { useNavigate } from "react-router-dom";
import { DEVICE_ROUTE } from '../utils/consts/routes';

const DeviceItem = ({device}) => {
    const navigate = useNavigate();
    return ( 
        <div onClick={()=>navigate(DEVICE_ROUTE + '/' + device.id)} className = 'deviceItem'>
            <div className = 'deviceItem__image-cont'>
                <img src = { process.env.REACT_APP_API_URL + device.img } alt = 'device item' />
            </div> 
            <div className = 'deviceItem__title-cont'>
                <h4 className = 'deviceItem__title' >{device.name}</h4> 
                <div className = 'deviceItem__rating-cont'>
                    <div className = 'deviceItem__rating' >{device.rate}</div> 
                    <img src={star} alt='rating star'/>
                </div> 
            </div > 
            <h3 className = 'deviceItem__price'>${device.price}</h3> 
        </div >
    );
};

export default DeviceItem;