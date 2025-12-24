import React, { useContext, useEffect, useState } from 'react';
import { Context } from '..';
import { Button } from 'react-bootstrap';
import card1 from '../assets/card_example1.png';
import card2 from '../assets/card_example2.jpg';
import card3 from '../assets/card_example3.jpg';
import { makeOrder, makeItems } from '../utils/order';
import { formatUSCurrency } from '../utils/dataFormat/currencies';

const CheckoutPage = () => {
    const {cart, user} = useContext(Context);
    const [payed, setPayed] = useState(false);
    const [items, setItems] = useState([]);


    useEffect(()=>{
        setItems(makeItems(cart));
    }, [])

    return (
        <div className='checkout'>
            <div className='checkout__container'>
                <div className='checkout__main-title'>
                    <h2>Checkout</h2>
                </div>
                {payed ? 
                    <h2 className='checkout__message'>Thank you! Your order has been placed!</h2> :
                    <div className='checkout__pays'>
                        <div className='checkout__items-cont'>
                            <h4>Your Items:</h4>
                            <div className='checkout__items'>
                                {items}
                            </div>
                        </div>
                        <div className='checkout__cards'>
                            <h4>Payment Methods:</h4>
                            <button className='checkout__card'>
                                <img alt='card' src={card1} />
                            </button>
                            <button className='checkout__card'>
                                <img alt='card' src={card2} />
                            </button>
                            <button className='checkout__card'>
                                <img alt='card' src={card3} />
                            </button>
                        </div>
                        <div className='checkout__total'>
                            <h2>Total: <span>{formatUSCurrency(cart.cartTotal)}</span></h2>
                        </div>
                        <div className='checkout__button-cont'>
                            <Button onClick={makeOrder.bind(this, setPayed, cart, user)} variant="warning" className='checkout__button'>Pay</Button>
                        </div>
                    </div>
                }

            </div>
        </div>
    );
};

export default CheckoutPage;