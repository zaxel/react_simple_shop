import React, {useContext} from 'react';
import { Context } from '..';
import { useNavigate } from "react-router-dom";
import { Button } from 'react-bootstrap';
import SponsoredItem from './SponsoredItem';
import { CHECKOUT_ROUTE } from '../utils/consts';

const CartAside = () => {
    const {cart, history} = useContext(Context);
    const navigate = useNavigate();

    const checkout = () => {
        navigate(CHECKOUT_ROUTE)
    }
    return (
        <aside className='basket__aside basket-aside'>
            {!!cart.itemsCount &&
                <div className='basket-aside__checkout-cont'>
                    <h3 className='basket-aside__subtotal'>Subtotal ({cart.itemsCount} items): <span>${cart.cartTotal}</span></h3>
                    <Button onClick={checkout} variant="warning" className='basket-aside__button'>Proceed to checkout</Button>
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