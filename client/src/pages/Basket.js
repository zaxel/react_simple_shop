import React from 'react';
import BasketItem from '../components/BasketItem';
import SponsoredItem from '../components/SponsoredItem';
import { Button, Modal, Form } from 'react-bootstrap';

const Basket = () => {
    return (
        <div className='basket'>
            <div className='basket__container'>
                <div className='basket__main'>
                    <div className='basket__title-cont'>
                        <h2 className='basket__main-title'>Shopping Cart</h2>
                        <h4>Price</h4>
                    </div>
                    <BasketItem/>
                    <BasketItem/>
                    <h3 className='basket__main-subtotal'>Subtotal (4 items): <span>$845.54</span></h3>
                </div>
                <aside className='basket__aside basket-aside'>
                    <div className='basket-aside__checkout-cont'>
                        <h3 className='basket-aside__subtotal'>Subtotal (3 items): <span>$145.50</span></h3>
                        <Button variant="warning" className='basket-aside__button'>Proceed to checkout</Button>
                    </div>
                    <div className='basket-aside__related-cont'>
                        <h4 className='basket-aside__title'>Customers Who Bought Items in Your Recent History Also Bought</h4>
                        <SponsoredItem/>
                        <SponsoredItem/>
                        <SponsoredItem/>
                        <SponsoredItem/>
                        <SponsoredItem/>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default Basket;