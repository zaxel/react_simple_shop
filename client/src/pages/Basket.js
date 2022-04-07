import React, { useContext } from 'react';
import { Context } from '..';
import BasketItem from '../components/BasketItem';
import SponsoredItem from '../components/SponsoredItem';
import { Button, Modal, Form } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';

const Basket = observer(() => {
    const { cart, user } = useContext(Context);
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
                            return <BasketItem key={device.id} device={device}/>
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