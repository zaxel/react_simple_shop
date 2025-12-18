import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CART_ROUTE } from '../utils/consts/routes';
import ShippingForm from '../components/cart/ShippingForm';
import PaymentForm from '../components/cart/PaymentForm';
import CartProducts from '../components/cart/CartProducts';

const steps = [
    {
        id: 1,
        title: "Shopping Cart",
    },
    {
        id: 2,
        title: "Shipping Address",
    },
    {
        id: 3,
        title: "Payment Method",
    },
];
const items = [
    {
        "id": 28,
        "name": "JVC DLA-NP5B 4K Projector",
        "price": 6500,
        "rate": 4.5,
        "img": "https://ik.imagekit.io/hzqqkwz0t/blob_afe76uSCi-",
        "type": "projectors",
        "brand": "JVC",
        "createdAt": 1765936269000,
        "updatedAt": 1765936269000,
        "deviceId": 1590,

        "quantity": 2,

    },
    {
        "id": 27,
        "name": "Handheld Mite Remover Home Bed Mattress Vacuum Sofa Cleaner USB UV-C Cleaner",
        "price": 19.99,
        "rate": 4.3,
        "img": "https://ik.imagekit.io/hzqqkwz0t/blob_wVk8OjaUHH",
        "type": "hoovers",
        "brand": "JVC",
        "createdAt": 1765936180000,
        "updatedAt": 1765936180000,
        "deviceId": 1572,

        "quantity": 1,
    },
    {
        "id": 26,
        "name": "Home & Office -Air Conditioning - Heating",
        "price": 999,
        "rate": 5,
        "img": "https://ik.imagekit.io/hzqqkwz0t/blob_FbU4u1RIxQ",
        "type": "air conditioners",
        "brand": "Beko",
        "createdAt": 1765921537000,
        "updatedAt": 1765921537000,
        "deviceId": 1563,

        "quantity": 1,
    },
    {
        "id": 16,
        "name": "Beko VRT50225VB Cordless Vacuum Cleaner - Black",
        "price": 157.77,
        "rate": 3,
        "img": "https://ik.imagekit.io/hzqqkwz0t/blob_5YmEKFIOj",
        "type": "hoovers",
        "brand": "Beko",
        "createdAt": 1765913347000,
        "updatedAt": 1765913347000,
        "deviceId": 1505,

        "quantity": 3,
    }
]

const Cart = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [shippingForm, setShippingForm] = useState(null);
    const [cartItems, setCartItems] = useState(()=>items);
    const navigate = useNavigate();

    const activeStep = parseInt(searchParams.get("step")) || 1;
    const subtotal = cartItems.reduce((acc, { price, quantity }) => acc + price * quantity, 0);
    const shipping = 10;
    const discount = 10;
    const total = subtotal + shipping + discount;

    return (
        <div className='w-full lg:w-4/5 m-auto flex-1 flex flex-col justify-center items-center py-12 gap-16 '>
            <h2 className='text-2xl font-medium'>Your Shopping Cart</h2>
            <div className='flex flex-col items-center lg:flex-row lg:gap-8 gap-16'>
                {steps.map(({ id, title }) => {
                    return <div className={`flex items-center gap-2 border-b-2 border-solid pb-4 ${id === activeStep ? "border-gray-800" : "border-gray-400"}`} key={id}>
                        <div className={`w-6 h-6 rounded-full text-white p-4 flex justify-center items-center ${id === activeStep ? "bg-gray-800" : "bg-gray-400"
                            }`}>{id}</div>
                        <p className={`text-small font-medium ${id === activeStep ? "text-gray-800" : "text-gray-400"
                            }`}>{title}</p>
                    </div>
                })}
            </div>
            <div className='w-full flex flex-col lg:flex-row gap-16'>
                    {activeStep === 1
                        ? <CartProducts items={cartItems} setItems={setCartItems}/>
                        : activeStep === 2
                            ? <ShippingForm setShippingForm={setShippingForm}/>
                            : activeStep === 3 && shippingForm
                                ? <PaymentForm /> 
                                : <div className='w-full lg:w-7/12 shadow-lg border-1 border-gray-100 p-8 rounded-lg flex flex-col gap-8'>
                                    <p className='text-sm text-gray-500'>Please fill in the shipping form to proceed.</p>
                                  </div>
                    }

                <div className='w-full lg:w-5/12 shadow-lg border-1 border-gray-100 p-8 rounded-lg flex flex-col gap-8 h-max'>
                    <h3 className='text-semibold'>Cart Details</h3>
                    <div className='flex flex-col gap-4'>
                        <div className='flex justify-between text-sm'>
                            <p className='text-gray-500'>Subtotal</p>
                            <p className='font-medium'>£{subtotal.toFixed(2)}</p>
                        </div>
                        <div className='flex justify-between text-sm'>
                            <p className='text-gray-500'>Discount({discount}%)</p>
                            <p className='font-medium text-gray-500'>£{(subtotal * discount / 100).toFixed(2)}</p>
                        </div>
                        <div className='flex justify-between text-sm'>
                            <p className='text-gray-500'>Shipping fee</p>
                            <p className='font-medium'>£{shipping.toFixed(2)}</p>
                        </div>
                        <hr className='border-gray-200' />
                        <div className='flex justify-between'>
                            <p className='text-gray-800 font-semibold'>Total</p>
                            <p className='font-medium'>£{total.toFixed(2)}</p>
                        </div>
                    </div>
                    {activeStep === 1 && <button onClick={() => navigate({
                        pathname: CART_ROUTE,
                        search: "?step=2",
                        preventScrollReset: true
                    })} className='flex justify-center items-center gap-2 w-full bg-gray-800 text-white p-2 rounded-lg cursor-pointer'>
                        Continue <ArrowRight className='w-3 h-3' />
                    </button>}
                </div>
            </div>
        </div>
    );
};

export default Cart;