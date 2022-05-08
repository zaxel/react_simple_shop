import React, {useContext} from 'react';
import { Context } from '../..';
import { addToCart } from '../../utils/addToCart';
import star from '../../assets/rating_star.png';
import { Button, Modal, Form } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { DEVICE_ROUTE } from '../../utils/consts';

const SponsoredItem = ({el}) => {
    const { user, cart } = useContext(Context);
    const device_amount = 1;
    const navigate = useNavigate();

    const onAddToCartPressed = () => {
        addToCart(cart, user.isAuth, cart.cartId, el.id, device_amount, user.user.id)
    }
    
    return (
        <div className='basket-sponsored'>
            <div className='basket-sponsored__img'>
                <img onClick={()=>navigate(DEVICE_ROUTE + '/' + el.id)} src={process.env.REACT_APP_API_URL + el.img} alt='basket random item' />
            </div>
            <div className='basket-sponsored__descr-cont'>
                <h4>{el.name}</h4>
                <div className='basket-sponsored__price-cont'>
                    <div className='basket-sponsored__star'>{el.rate} 
                        <img src={star} alt='rating star'/>
                    </div>
                    <h5>${el.price}</h5>
                </div>
                <Button onClick={onAddToCartPressed} variant="warning" className='basket-aside__button'>Add to Cart</Button>
            </div>
        </div>
    );
};

export default SponsoredItem;