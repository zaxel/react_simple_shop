import React, {useContext, useEffect, useState} from 'react';
import { Context } from '../..';
import { useNavigate } from "react-router-dom";
import { Button } from 'react-bootstrap';
import SponsoredItem from './SponsoredItem';
import { CHECKOUT_ROUTE, RANDOM_DEVICES_COUNT } from '../../utils/consts/routes';
import { fetchRandomDevices } from '../../http/deviceAPI';

const CartAside = () => {
    const { cart } = useContext(Context);
    const navigate = useNavigate();
    const [randomDevices, setRandomDevices] = useState([]);

    const checkout = () => {
        navigate(CHECKOUT_ROUTE)
    }

    useEffect(()=>{
         (async()=> {
            const devices = await fetchRandomDevices(RANDOM_DEVICES_COUNT);
            setRandomDevices(devices);  
          })()
    }, []);

    return (
        <aside className='basket__aside basket-aside'>
            {!!cart.itemsCount &&
                <div className='basket-aside__checkout-cont'>
                    <h3 className='basket-aside__subtotal'>Subtotal ({cart.itemsCount} items): <span>${cart.cartTotal}</span></h3>
                    <Button onClick={checkout} variant="warning" className='basket-aside__button'>Proceed to checkout</Button>
                </div>}
            <div className='basket-aside__related-cont'>
                <h4 className='basket-aside__title'>Customers Who Bought Items in Your Recent History Also Bought</h4>
                {randomDevices.map(el=>{
                    return <SponsoredItem key={el.id} el={el}/>
                })}
            </div>
        </aside>
    );
};

export default CartAside;