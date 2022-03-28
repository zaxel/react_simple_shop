import React from 'react';
import plugImage from '../assets/iPhone11.jpg';
import star from '../assets/rating_star.png';

const DeviceItem = ({device}) => {
    console.log(process.env.REACT_APP_API_URL+device.img)
    return ( 
        <div className = 'deviceItem'>
            <div className = 'deviceItem__image-cont'>
                <img src = { process.env.REACT_APP_API_URL + device.img } alt = 'item photo' />
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