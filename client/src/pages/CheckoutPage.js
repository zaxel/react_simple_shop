import React from 'react';
import { Button } from 'react-bootstrap';
import card1 from '../assets/card_example1.png';
import card2 from '../assets/card_example2.jpg';
import card3 from '../assets/card_example3.jpg';

const CheckoutPage = () => {
    return (
        <div className='checkout'>
            <div className='checkout__container'>
                <div className='checkout__main-title'>
                    <h2>Checkout</h2>
                </div>
                <div className='checkout__pays'>
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
                        <h2>Total: <span>$900.00</span></h2>
                    </div>
                    <div className='checkout__button-cont'>
                        <Button variant="warning" className='checkout__button'>Pay</Button>
                    </div>
                </div>
                <h2 className='checkout__message'>Thank you! Your order has been placed!</h2>

            </div>
        </div>
    );
};

export default CheckoutPage;