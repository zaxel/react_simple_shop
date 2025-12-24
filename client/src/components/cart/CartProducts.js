import {  ChevronLeft, ChevronRight, Trash2 } from 'lucide-react';
import RateItem from '../device/RateItem';


const CartProducts = ({ items, updateQuantity, deleteItem }) => { 
    return ( 
        <div className='w-full lg:w-7/12 shadow-lg border-1 border-gray-100 p-8 rounded-lg flex flex-col gap-8'>
            {items.length 
                ? items.map(({ device_amount: quantity, device: {name, id, img, price, rate, type, brand, createdAt} }) => {
                return <div className='flex justify-between items-center' key={id}>
                     <div className='flex gap-8'>
                        <div className=''>
                            <div className='relative w-32 h-32 bg-gray-50 rounded-lg overflow-hidden'>
                                <img className='absolute w-full h-full object-cover' src={img?.[0]?.url || "/"} alt={name} />
                            </div> 
                        </div>
                        <div className='flex flex-col justify-between'>
                            <div className='flex flex-col gap-1'>
                                <h3 className='text-sm font-medium line-clamp-1 overflow-ellipsis'>{name}</h3>
                                <div className='scale-50 origin-left text-gray-500'><RateItem rate={rate} /></div>
                                <p className='text-xs text-gray-500'>Brand: {brand.name}</p>
                                <div className='flex gap-2 text-xs text-gray-500'>
                                    <p>Quantity:</p> 
                                    <div className='relative w-12 h-5 bg-gray-50 rounded-lg overflow-hidden'>
                                        <button disabled={quantity<=1} onClick={()=>{
                                            if(quantity<=1) return;
                                            updateQuantity(id, quantity-1);
                                        }} className='absolute top-0 left-0 w-4 h-4 rounded-full'><ChevronLeft className='w-4 h-4'/></button>
                                        <p className='text-center'>{quantity}</p>    
                                        <button disabled={quantity>=9} onClick={()=>{
                                            if(quantity>=19) return;
                                            updateQuantity(id, quantity+1);
                                        }} className='absolute top-0 right-0 w-4 h-4 rounded-full'><ChevronRight className='w-4 h-4'/></button>
                                    </div>
                                </div>
                            </div>
                            <p className='font-medium'>${(price * quantity).toFixed(2)}</p>
                        </div>
                    </div> 
                    <button onClick={()=>deleteItem(id)} className='w-8 h-8 shrink-0 flex justify-center items-center rounded-full bg-red-100 text-red-400 cursor-pointer'><Trash2 className='w-3 h-3' /></button>
                </div>
            })
                : <p className='text-sm text-gray-500'>You shopping bag is empty.</p>}
        </div>
    );
};

export default CartProducts;