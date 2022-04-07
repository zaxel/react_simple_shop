import React, { useState } from 'react';
import item from '../assets/iPhone11.jpg';
import { Button, Modal, Form } from 'react-bootstrap';


const BasketItem = () => {
    const amount = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    const [selectedValue, setSelectedValue] = useState(1);
    const selectHandler = (e) =>{
        if(e.target.selectedIndex === amount.length-1){
            console.log(66);
            return;
        };
        setSelectedValue(e.target.value)
    }
    return (
        <div className='basket-item'>
            <div className='basket-item__img'>
                <img src={item} alt='basket item' />
            </div>
            <div className='basket-item__descr-cont'>
                <div className='basket-item__descr-subcont'>
                    <h2>Z-Edge U28I4K 28-inch Gaming Monitor Ultra HD 4K 3840x2160 IPS LED Monitor, 300 cd/m², 4 ms Response Time, HDMI+DP+Type-C+USB-B+USB2, Built-in Speakers, FreeSync TechnologyZ-Edge U28I4K 28-inch Gaming Monitor Ultra HD 4K 3840x2160 IPS LED Monitor, 300 cd/m²</h2>

                    <div className='basket-item__buttons-cont'>
                        <Form.Select value={selectedValue} onChange={selectHandler} className="device-modal__select">
                            {amount.map(el =>
                                <option key={el}>Qty: {el ? el : el+' (remove)'}</option>
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