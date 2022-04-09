import React, { useContext, useEffect } from 'react';
import { Context } from '..';
import {  useLocation } from "react-router-dom"
import BasketItem from '../components/BasketItem';
import SponsoredItem from '../components/SponsoredItem';
import { deleteDevice } from '../utils/fetchSetCart';
import { Button } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';

const Basket = observer(() => {

    let {pathname} = useLocation();
    const {cart, history} = useContext(Context);
  
    useEffect(()=>{
      history.setAuthFrom(pathname);
    },[])

    return (
        <div className='basket'>{console.log(cart.itemsCount)}
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
                        <h3 className='basket__main-subtotal'>Subtotal (4 items): <span>$845.54</span></h3>
                    </div> :
                    <div className='basket__main'>
                        <div className='basket__title-cont'>
                            <h2 className='basket__main-title'>Your basket empty</h2>
                        </div>
                    </div>
                }
                <aside className='basket__aside basket-aside'>
                    {!!cart.itemsCount &&
                        <div className='basket-aside__checkout-cont'>
                            <h3 className='basket-aside__subtotal'>Subtotal (3 items): <span>$145.50</span></h3>
                            <Button variant="warning" className='basket-aside__button'>Proceed to checkout</Button>
                        </div>}
                    <div className='basket-aside__related-cont'>
                        <h4 className='basket-aside__title'>Customers Who Bought Items in Your Recent History Also Bought</h4>
                        <SponsoredItem />
                        <SponsoredItem />
                        <SponsoredItem />
                        <SponsoredItem />
                        <SponsoredItem />
                    </div>
                </aside>
            </div>
        </div>
    );
});

export default Basket;