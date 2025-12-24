import { ArrowRight } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import {  useNavigate, useSearchParams } from 'react-router-dom';
import { CART_ROUTE } from '../utils/consts/routes';
import ShippingForm from '../components/cart/ShippingForm';
import CartProducts from '../components/cart/CartProducts';
import { Context } from '..';
import { observer } from 'mobx-react-lite';
import useFetch from '../utils/http/useFetch';
import { checkout } from '../http/orderAPI';
import { loadStripe } from '@stripe/stripe-js';
import PaymentStripeForm from '../components/cart/PaymentStripeForm';

import { CheckoutProvider } from '@stripe/react-stripe-js/checkout';
import PaymentFormSkeleton from '../components/cart/PaymentFormSkeleton';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_API_KE);

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

const Cart = () => {
    const { cart, user } = useContext(Context);
    const [clientSecret, setClientSecret] = useState(null);

    const [searchParams, setSearchParams] = useSearchParams();
    const [shippingForm, setShippingForm] = useState(null);
    const [defaultAddress, setDefaultAddress] = useState(null);
    const { cart: cartItems, updateQuantity, removeDevice } = cart;
    const navigate = useNavigate();
    const activeStep = parseInt(searchParams.get("step")) || 1;
    const subtotal = cartItems.reduce((acc, { device_amount: quantity, device: { price } }) => acc + price * quantity, 0);
    const shipping = 10;
    const discount = 10;
    const total = subtotal - (subtotal * discount / 100) + shipping;


    const handleProceedPay = async (shippingData) => {
        const cartInfo = cartItems.map(({ device_amount, deviceId }) => ({ device_amount, deviceId }));
        const order = { items: cartInfo, address: { country: "US", ...shippingData } };

        const { orderId: receivedOrderId, clientSecret: receivedClientSecret } = await checkout({ order });
        if(!receivedClientSecret) return;
        setClientSecret(receivedClientSecret);
    }
   

    const { data, error, isLoading } = useFetch(`api/user/${user.user?.id}/addresses`, null, true);
    useEffect(() => {

        if (!data || error) return;
        const { count, rows } = data;
        if (!count) return;
        const address = rows.find(el => el.is_default) ?? rows[0];
        setDefaultAddress(address)
    }, [data])

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
                    ? <CartProducts items={cartItems} updateQuantity={updateQuantity} deleteItem={removeDevice} />
                    : activeStep === 2
                        ? <ShippingForm handleProceedPay={handleProceedPay} setShippingForm={setShippingForm} defaultAddress={defaultAddress} user={user.user} />
                        : activeStep === 3 && shippingForm
                            ? (clientSecret ? <div className='w-full lg:w-7/12 shadow-lg border-1 border-gray-100 p-8 rounded-lg flex flex-col gap-8'><CheckoutProvider
                                stripe={stripePromise}
                                options={{
                                    clientSecret,
                                }}
                            >
                                <PaymentStripeForm email={user.user?.email}/>
                            </CheckoutProvider></div> : <PaymentFormSkeleton />)
                            : <div className='w-full lg:w-7/12 shadow-lg border-1 border-gray-100 p-8 rounded-lg flex flex-col gap-8'>
                                <p className='text-sm text-gray-500'>Please fill in the shipping form to proceed.</p>
                            </div>
                }

                <div className='w-full lg:w-5/12 shadow-lg border-1 border-gray-100 p-8 rounded-lg flex flex-col gap-8 h-max'>
                    <h3 className='text-semibold'>Cart Details</h3>
                    <div className='flex flex-col gap-4'>
                        <div className='flex justify-between text-sm'>
                            <p className='text-gray-500'>Subtotal</p>
                            <p className='font-medium'>${subtotal.toFixed(2)}</p>
                        </div>
                        <div className='flex justify-between text-sm'>
                            <p className='text-gray-500'>Discount({discount}%)</p>
                            <p className='font-medium text-gray-500'>${(subtotal * discount / 100).toFixed(2)}</p>
                        </div>
                        <div className='flex justify-between text-sm'>
                            <p className='text-gray-500'>Shipping fee</p>
                            <p className='font-medium'>${subtotal ? shipping.toFixed(2) : 0..toFixed(2)}</p>
                        </div>
                        <hr className='border-gray-200' />
                        <div className='flex justify-between'>
                            <p className='text-gray-800 font-semibold'>Total</p>
                            <p className='font-medium'>${subtotal ? total.toFixed(2) : 0..toFixed(2)}</p>
                        </div>
                    </div>
                    {activeStep === 1 && <button disabled={!cartItems.length} onClick={() => navigate({
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

export default observer(Cart);