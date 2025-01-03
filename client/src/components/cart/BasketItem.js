import React, { useContext, useEffect, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { Context } from '../..';
import { deleteDevice, updateDeviceAmount } from '../../utils/cart/fetchSetCart';
import { setLocalStoreCart } from '../../utils/cart/setLocalStoreCart';
import { useNavigate } from 'react-router-dom';
import { DEVICE_ROUTE } from '../../utils/consts/routes';
import { formatGbCurrency } from '../../utils/dataFormat/currencies';
import no_image from '../../assets/no-image.jpg';


const BasketItem = observer(({device, basketDevice}) => {
    const { user, cart } = useContext(Context);
    const navigate = useNavigate();
    const amount = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    const [selectedValue, setSelectedValue] = useState(basketDevice?.device_amount || 1);

    useEffect(()=>{
        setSelectedValue(basketDevice?.device_amount || 1);
    }, [basketDevice?.device_amount])
    
    const selectHandler = async(event) =>{
        
        try{
            if(event.target.selectedIndex === amount.length-1){
                deleteDevice(user, cart, basketDevice.basketId, device.id );
                return;
            };
            setSelectedValue(event.target.value);
            await updateDeviceAmount(user, cart, basketDevice.basketId, device.id, +event.target.value);
            
            cart.calcItemsCount();
            cart.setCartTotal();
            setLocalStoreCart(cart);
        }catch(e){
            console.log(e);
        }
        
    }
    const navigateToItem = () =>{
        navigate(DEVICE_ROUTE + '/' + device.id)
    }
    
    return (
        <div className='basket-item'>
            <div onClick={navigateToItem} className='basket-item__img'>
                <img src = { device.img?.[0]?.url || no_image }  alt = {`basket item ${device.name}`} />
            </div>
            <div className='basket-item__descr-cont'>
                <div className='basket-item__descr-subcont'>
                    <h2 onClick={navigateToItem}>{device.name}</h2>

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
                    <h3>{formatGbCurrency(device.price)}</h3>
                </div>

            </div>

        </div>
    );
});

export default BasketItem;