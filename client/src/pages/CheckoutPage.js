import React, { useContext, useEffect, useState } from 'react';
import { Context } from '..';
import { Button } from 'react-bootstrap';
import card1 from '../assets/card_example1.png';
import card2 from '../assets/card_example2.jpg';
import card3 from '../assets/card_example3.jpg';
import { createOrder } from '../http/orderAPI';

const CheckoutPage = () => {
    const {cart, cartDevices} = useContext(Context);
    const [payed, setPayed] = useState(false);
    const [items, setItems] = useState([]);


    const makeOrder = async() => {
        const orderDevices = cart.cart.map(device=> { 
            return {deviceId: device.deviceId, amount: device.device_amount} 
        })
        const data = await createOrder(orderDevices, cart.cartId);
        cart.clearCart();
        setPayed(true);
    }
    const makeItems = () => {
        const items = cart.cartDevices.map((device, i)=>{
            const count = cart.cart.find(el=>el.deviceId===device.id).device_amount;
            return <div key={device.id} className='checkout__item-row'>
                <div className='checkout__item-title'>{device.name}</div>
                <div className='checkout__count'>x {count}</div>
                <div className='checkout__price'>${device.price}</div>
            </div>
        })
        return items;
    }
    useEffect(()=>{
        
        setItems(makeItems());
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
                                {/* <div className='checkout__item-row'>
                                    <div className='checkout__item-title'>Thank you! Your order has been placed! Thank you! Your order has been placed! Thank you! Your order has been placed!</div>
                                    <div className='checkout__count'>x 2</div>
                                    <div className='checkout__price'>$88.90</div>
                                </div>
                                <div className='checkout__item-row'>
                                    <div className='checkout__item-title'>iPhone -apt95</div>
                                    <div className='checkout__count'>x 1</div>
                                    <div className='checkout__price'>$20.00</div>
                                </div>
                                <div className='checkout__item-row'>
                                    <div className='checkout__item-title'>Nokia AZ16=LS</div>
                                    <div className='checkout__count'>x 1</div>
                                    <div className='checkout__price'>$10.90</div>
                                </div>
                                <div className='checkout__item-row'>
                                    <div className='checkout__item-title'>Siemens -"lX6</div>
                                    <div className='checkout__count'>x 5</div>
                                    <div className='checkout__price'>$88.90</div>
                                </div> */}
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
                            <h2>Total: <span>${cart.cartTotal}</span></h2>
                        </div>
                        <div className='checkout__button-cont'>
                            <Button onClick={makeOrder} variant="warning" className='checkout__button'>Pay</Button>
                        </div>
                    </div>
                }

            </div>
        </div>
    );
};

export default CheckoutPage;