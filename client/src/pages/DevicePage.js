import React, { useContext, useEffect, useState } from 'react';
import bigStar from '../assets/rating_star_b.png';
import star from '../assets/rating_star.png';
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { fetchSingleDevice } from '../http/deviceAPI';
import { Spinner } from 'react-bootstrap';
import { addToCart } from '../utils/addToCart';
import { Context } from '..';

const DevicePage = () => {
    const [device, setDevice] = useState({});
    const { user, cart } = useContext(Context);
    const device_amount = 1;

  let {id} = useParams();
    useEffect(()=>{
        fetchSingleDevice(id).then(data=>{
            setTimeout(()=>setDevice(data), 2000) 
        })
    }, [])

    return (
        <div className='device'>
            <div className='device__cont'>
                <div className='device__main-cont'>
                    {Object.keys(device).length === 0 ? 
                        <div className='device__img-cont'>
                            <div className="spinner">
                                <Spinner animation="border" />
                            </div>
                        </div> :
                        <div className='device__img-cont'>
                            <img src={process.env.REACT_APP_API_URL + device.img} alt='item photo'/>
                        </div>}
                    <div className='device__title-cont'>
                        <h2>{device.name}</h2>
                        <div className='device__star-cont' style={{background: `url(${bigStar}) no-repeat center center / contain`}}>
                            <img src={star} alt='rating star'/>{device.rate} 
                        </div>
                        
                    </div>
                    <div className='device__price-cont'>
                        <h2>${device.price}</h2>
                        <button onClick={()=>addToCart(cart, user.isAuth, cart.cartId, device.id, device_amount)} className='btn btn-outline-light auth__button device__button'>add to basket</button>
                    </div>
                </div>
                <div className='device__specification'>
                    <h2>Specifications:</h2>
                    <ul>
                        {device.info?.map(spec => 
                            <li key={spec.id}>{spec.title}: {spec.description}</li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DevicePage;