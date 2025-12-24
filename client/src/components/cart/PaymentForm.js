import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { formPaymentSchema } from './cartFormsSchemas';
import { ShoppingCart } from 'lucide-react';

const PaymentForm = ({user, checkoutHandler}) => {
    console.log(user)
        const { reset, register, handleSubmit, formState: { errors }} = useForm({
            resolver: zodResolver(formPaymentSchema),
            defaultValues: {
                cardHolder: `${user?.name ?? ""} ${user?.surname ?? ""}`,
            },
            mode: 'onChange',
        })
    
        const onSubmitHandler = async data => {
            // console.log('checkout', data)
            checkoutHandler(data);
        }
    
        return (
            <div className='w-full lg:w-7/12 shadow-lg border-1 border-gray-100 p-8 rounded-lg flex flex-col gap-8'>
                <form onSubmit={handleSubmit(onSubmitHandler)} className='flex flex-col gap-4'>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor='cardHolder' className='text-xs text-gray-500 font-medium'>Name on card</label>
                        <input className='border-b border-grey-200 py-2 outline-0 text-sm' type='text' id='cardHolder' placeholder='Cardholder Name' {...register("cardHolder")}></input>
                        {errors.cardHolder && <p className='text-xs text-red-500'>{errors.cardHolder.message}</p>}
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor='cardNumber' className='text-xs text-gray-500 font-medium'>Card Number</label>
                        <input className='border-b border-grey-200 py-2 outline-0 text-sm' type='text' id='cardNumber' placeholder='1234-4321-1234-4321' {...register("cardNumber")}></input>
                        {errors.cardNumber && <p className='text-xs text-red-500'>{errors.cardNumber.message}</p>}
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor='expirationDate' className='text-xs text-gray-500 font-medium'>Expiration Date</label>
                        <input className='border-b border-grey-200 py-2 outline-0 text-sm' type='text' id='expirationDate' placeholder='02/36' {...register("expirationDate")}></input>
                        {errors.expirationDate && <p className='text-xs text-red-500'>{errors.expirationDate.message}</p>}
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor='cvv' className='text-xs text-gray-500 font-medium'>CVV</label>
                        <input className='border-b border-grey-200 py-2 outline-0 text-sm' type='text' id='cvv' placeholder='123' {...register("cvv")}></input>
                        {errors.cvv && <p className='text-xs text-red-500'>{errors.cvv.message}</p>}
                    </div>  
                    <div className='flex items-center gap-2 mt-4'>
                        <img className='rounded-md' height={25} width={50} src="./cards.png" alt="cards logo" />
                        <img className='rounded-md' height={25} width={50} src="./stripe.png" alt="stripe logo" />
                        <img className='rounded-md' height={25} width={50} src="./klarna.png" alt="klarna logo" />
                    </div>
                    
                    <button type='submit' className='flex justify-center items-center gap-2 w-full bg-gray-800 text-white p-2 rounded-lg cursor-pointer'>
                        Checkout <ShoppingCart className='w-3 h-3' />
                    </button>
                </form>
            </div>
        );
};

export default PaymentForm;