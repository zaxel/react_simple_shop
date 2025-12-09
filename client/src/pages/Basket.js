import React, { useContext, useEffect } from 'react';
import { Context } from '..';
import {  useLocation } from "react-router-dom"
import BasketItem from '../components/cart/BasketItem';
import { observer } from 'mobx-react-lite';
import CartAside from '../components/cart/CartAside';
import { formatGbCurrency } from '../utils/dataFormat/currencies';

const Basket = observer(() => {
    let {pathname} = useLocation();
    const {cart, history} = useContext(Context);
  
    useEffect(()=>{
      history.setAuthFrom(pathname);
    },[])
    
    return (
        <div className='basket'>
            <div className='basket__container'>
                {cart.itemsCount ?
                    <div className='basket__main'>
                        <div className='basket__title-cont'>
                            <h2 className='basket__main-title'>Shopping Cart</h2>
                            <h4>Price</h4>
                        </div>
                        {cart.cartDevices.map(device=>{
                            const basketDevice = cart.cart.find(el=>el.deviceId === device.id);
                            return <BasketItem key={device.id} device={device} basketDevice={basketDevice}/>
                        })}
                        <h3 className='basket__main-subtotal'>Subtotal ({cart.itemsCount} items): <span>{formatGbCurrency(cart.cartTotal)}</span></h3>
                    </div> :
                    <div className='basket__main'>
                        <div className='basket__title-cont'>
                            <h2 className='basket__main-title'>Your basket empty</h2>
                        </div>
                    </div>
                }
                <CartAside/>
            </div>
        </div>
    );
});

export default Basket;