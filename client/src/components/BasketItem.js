import React, { useContext, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import { deleteDevice, updateDeviceAmount } from '../utils/fetchSetCart';
import { setLocalStoreCart } from '../utils/setLocalStoreCart';


const BasketItem = observer(({device, basketDevice}) => {
    const { user, cart } = useContext(Context);
    const amount = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    const [selectedValue, setSelectedValue] = useState(basketDevice?.device_amount || 1);

    
    const selectHandler = async(event) =>{
        
        try{
            if(event.target.selectedIndex === amount.length-1){
                deleteDevice(user, cart, basketDevice.basketId, device.id );
                return;
            };
            setSelectedValue(event.target.value);
            await updateDeviceAmount(user, cart, basketDevice.basketId, device.id, +event.target.value);
            
            cart.calcItemsCount();
            
            setLocalStoreCart(cart);
        }catch(e){
            console.log(e);
        }
        
    }
    
    
    return (
        <div className='basket-item'>
            <div className='basket-item__img'>
                <img src={process.env.REACT_APP_API_URL + device.img} alt='basket item' />
            </div>
            <div className='basket-item__descr-cont'>
                <div className='basket-item__descr-subcont'>
                    <h2>{device.name}</h2>

                    <div className='basket-item__buttons-cont'>
                        <Form.Select value={selectedValue} onChange={selectHandler} className="device-modal__select">
                            {amount.map(el =>
                                <option key={el} value={el} >Qty: {el ? el : el+' (remove)'}</option>
                            )}
                            
                        </Form.Select>
                        <Button variant="danger" onClick={()=>deleteDevice(user, cart, basketDevice.basketId, device.id )}>
                            Delete
                        </Button>
                    </div>

                </div>
                <div className='basket-item__price-cont'>
                    <h3>${device.price}</h3>
                </div>

            </div>

        </div>
    );
});

export default BasketItem;