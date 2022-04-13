import React, {useContext} from 'react';
import { Context } from '..';
import { Button } from 'react-bootstrap';
import SponsoredItem from './SponsoredItem';

const CartAside = () => {
    const {cart, history} = useContext(Context);
    return (
        <aside className='basket__aside basket-aside'>
            {!!cart.itemsCount &&
                <div className='basket-aside__checkout-cont'>
                    <h3 className='basket-aside__subtotal'>Subtotal ({cart.itemsCount} items): <span>${cart.cartTotal}</span></h3>
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
    );
};

export default CartAside;