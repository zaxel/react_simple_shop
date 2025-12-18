import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { formShippingSchema } from './cartFormsSchemas';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { CART_ROUTE } from '../../utils/consts/routes';




const ShippingForm = ({ setShippingForm }) => {
    const navigate = useNavigate();
    const { reset, register, handleSubmit, formState: { errors }} = useForm({
        resolver: zodResolver(formShippingSchema),
        mode: 'onChange',
    })

    const onSubmitHandler = async data => {
        // await addNewAddress(data);
        // reset();
        // onClose();
        setShippingForm(data);

        navigate({
            pathname: CART_ROUTE,
            search: "?step=3",
            preventScrollReset: true
        })
    }

    return (
        <div className='w-full lg:w-7/12 shadow-lg border-1 border-gray-100 p-8 rounded-lg flex flex-col gap-8'>
            <form onSubmit={handleSubmit(onSubmitHandler)} className='flex flex-col gap-4'>
                <div className='flex flex-col gap-1'>
                    <label htmlFor='name' className='text-xs text-gray-500 font-medium'>Name</label>
                    <input className='border-b border-grey-200 py-2 outline-0 text-sm' type='text' id='name' placeholder='Mark Brown' {...register("name")}></input>
                    {errors.name && <p className='text-xs text-red-500'>{errors.name.message}</p>}
                </div>
                <div className='flex flex-col gap-1'>
                    <label htmlFor='email' className='text-xs text-gray-500 font-medium'>Email</label>
                    <input className='border-b border-grey-200 py-2 outline-0 text-sm' type='text' id='email' placeholder='mark@gmail.com' {...register("email")}></input>
                    {errors.email && <p className='text-xs text-red-500'>{errors.email.message}</p>}
                </div>
                <div className='flex flex-col gap-1'>
                    <label htmlFor='phone' className='text-xs text-gray-500 font-medium'>Phone</label>
                    <input className='border-b border-grey-200 py-2 outline-0 text-sm' type='text' id='phone' placeholder='+1-123-456789' {...register("phone")}></input>
                    {errors.phone && <p className='text-xs text-red-500'>{errors.phone.message}</p>}
                </div>
                <div className='flex flex-col gap-1'>
                    <label htmlFor='address' className='text-xs text-gray-500 font-medium'>Address</label>
                    <input className='border-b border-grey-200 py-2 outline-0 text-sm' type='text' id='address' placeholder='Trent rd, 27b' {...register("address")}></input>
                    {errors.address && <p className='text-xs text-red-500'>{errors.address.message}</p>}
                </div>
                <div className='flex flex-col gap-1'>
                    <label htmlFor='city' className='text-xs text-gray-500 font-medium'>City</label>
                    <input className='border-b border-grey-200 py-2 outline-0 text-sm' type='text' id='city' placeholder='London' {...register("city")}></input>
                    {errors.city && <p className='text-xs text-red-500'>{errors.city.message}</p>}
                </div>
                <button type='submit' className='flex justify-center items-center gap-2 w-full bg-gray-800 text-white p-2 rounded-lg cursor-pointer'>
                    Continue <ArrowRight className='w-3 h-3' />
                </button>
            </form>
        </div>
    );
};

export default ShippingForm; 