import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { formShippingSchema } from './cartFormsSchemas';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { CART_ROUTE } from '../../utils/consts/routes';
import { useEffect } from 'react';
import { useRef } from 'react';




const ShippingForm = ({ setShippingForm, defaultAddress, user, handleProceedPay }) => {
    const navigate = useNavigate();
    const isInitialized = useRef(false);

    const { reset, register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(formShippingSchema),
        defaultValues: {
            name: `${user?.name ?? ""} ${user?.surname ?? ""}`,
            email: user?.email ?? "",
            phone: user?.phone ?? "",
            street: "",
            house: "",
            city: "",
            postal_code: "",
        },
        mode: 'onChange',
    })

    useEffect(() => {
        if (!defaultAddress || !user || isInitialized.current) return;
        isInitialized.current = true;
        reset({
            name: `${user.name} ${user.surname}`,
            email: user.email ?? "",
            phone: user.phone ?? "",
            street: defaultAddress.street ?? "",
            house: defaultAddress.house ?? "",
            city: defaultAddress.city ?? "",
            postal_code: defaultAddress.postal_code ?? "", 
        });
    }, [defaultAddress, user, reset]);

    const onSubmitHandler = async data => {
        setShippingForm(data);
        handleProceedPay(data);

        navigate({
            pathname: CART_ROUTE,
            search: "?step=3",
            preventScrollReset: true
        })
    }

    return (
        <div className='w-full lg:w-7/12 shadow-lg border-1 border-gray-100 p-8 rounded-lg flex flex-col gap-8'>
            <form onSubmit={handleSubmit(onSubmitHandler)} className='flex flex-col gap-2'>
                <div className='flex flex-col gap-1'>
                    <label htmlFor='name' className='text-xs text-gray-500 font-medium'>Name</label>
                    <input className='border-b border-grey-200 py-2 outline-0 text-sm' type='text' id='name' placeholder='Name' {...register("name")}></input>
                    {errors.name && <p className='text-xs text-red-500'>{errors.name.message}</p>}
                </div>
                <div className='flex flex-col gap-1'>
                    <label htmlFor='email' className='text-xs text-gray-500 font-medium'>Email</label>
                    <input className='border-b border-grey-200 py-2 outline-0 text-sm' type='text' id='email' placeholder='your_email@gmail.com' {...register("email")}></input>
                    {errors.email && <p className='text-xs text-red-500'>{errors.email.message}</p>}
                </div>
                <div className='flex flex-col gap-1'>
                    <label htmlFor='phone' className='text-xs text-gray-500 font-medium'>Phone</label>
                    <input className='border-b border-grey-200 py-2 outline-0 text-sm' type='text' id='phone' placeholder='+1-123-456789' {...register("phone")}></input>
                    {errors.phone && <p className='text-xs text-red-500'>{errors.phone.message}</p>}
                </div>

                <div className='flex flex-col gap-1'>
                    <label htmlFor='street' className='text-xs text-gray-500 font-medium'>Street</label>
                    <input className='border-b border-grey-200 py-2 outline-0 text-sm' type='text' id='street' placeholder='your street' {...register("street")}></input>
                    {errors.street && <p className='text-xs text-red-500'>{errors.street.message}</p>}
                </div>
                <div className='flex flex-col gap-1'>
                    <label htmlFor='house' className='text-xs text-gray-500 font-medium'>House</label>
                    <input className='border-b border-grey-200 py-2 outline-0 text-sm' type='text' id='house' placeholder='your house' {...register("house")}></input>
                    {errors.house && <p className='text-xs text-red-500'>{errors.house.message}</p>}
                </div>
                <div className='flex flex-col gap-1'>
                    <label htmlFor='city' className='text-xs text-gray-500 font-medium'>City</label>
                    <input className='border-b border-grey-200 py-2 outline-0 text-sm' type='text' id='city' placeholder='your city' {...register("city")}></input>
                    {errors.city && <p className='text-xs text-red-500'>{errors.city.message}</p>}
                </div>
                <div className='flex flex-col gap-1'>
                    <label htmlFor='postal_code' className='text-xs text-gray-500 font-medium'>Postal Code</label>
                    <input className='border-b border-grey-200 py-2 outline-0 text-sm' type='text' id='postal_code' placeholder='your postal code' {...register("postal_code")}></input>
                    {errors.postal_code && <p className='text-xs text-red-500'>{errors.postal_code.message}</p>}
                </div>
                <button type='submit' className='flex justify-center items-center gap-2 w-full bg-gray-800 text-white p-2 rounded-lg cursor-pointer'>
                    Proceed to payment <ArrowRight className='w-3 h-3' />
                </button>
            </form>
        </div>
    );
};

export default ShippingForm; 