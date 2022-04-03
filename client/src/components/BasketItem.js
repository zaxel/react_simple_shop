import React, { useState } from 'react';
import item from '../assets/iPhone11.jpg';
import { Button, Modal, Form } from 'react-bootstrap';


const BasketItem = () => {
    const amount = [0, 1, 2, 3, 4];
    const [selectedValue, setSelectedValue] = useState('');
    return (
        <div className='basket-item'>
            <div className='basket-item__img'>
                <img src={item} alt='basket item' />
            </div>
            <div className='basket-item__descr-cont'>
                <div className='basket-item__descr-subcont'>
                    <h2>Z-Edge U28I4K 28-inch Gaming Monitor Ultra HD 4K 3840x2160 IPS LED Monitor, 300 cd/m², 4 ms Response Time, HDMI+DP+Type-C+USB-B+USB2, Built-in Speakers, FreeSync TechnologyZ-Edge U28I4K 28-inch Gaming Monitor Ultra HD 4K 3840x2160 IPS LED Monitor, 300 cd/m²</h2>

                    <div className='basket-item__buttons-cont'>
                        <Form.Select value={selectedValue} onChange={setSelectedValue} className="device-modal__select">
                            <option>Qty: {2}</option>
                            {amount.map(el =>
                                <option key={el}>{el}</option>
                            )}
                        </Form.Select>
                        <Button variant="danger" onClick={() => console.log(22)}>
                            Delete
                        </Button>
                    </div>

                </div>
                <div className='basket-item__price-cont'>
                    <h3>$289.54</h3>
                </div>

            </div>

        </div>
    );
};

export default BasketItem;