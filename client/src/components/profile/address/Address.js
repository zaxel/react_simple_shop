import React, { useState } from 'react';
import { Sheet, SheetTrigger } from '../../../shadcn/sheet';
import { Button } from '../../../shadcn/button';
import { ClipboardPaste } from 'lucide-react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../../../shadcn/select';
import AddressSheetContent from './AddressSheetContent';
import { useContext } from 'react';
import { Context } from '../../..';
import useFetch from '../../../utils/http/useFetch';
import { useEffect } from 'react';
import { addAddress, deleteAddress, setDefaultAddress } from '../../../http/userAPI';
import ErrorBox from '../../ErrorBox';
import { Spinner } from '../../../shadcn/spinner';

const Address = () => {
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const [addresses, setAddresses] = useState([]);
    const [defaultId, setDefaultId] = useState(null);

    const { user } = useContext(Context);
    const userId = user.user?.id;
    const url = `api/user/${userId}/addresses`;

    const { data, error, isLoading } = useFetch(url, null, true);

    useEffect(() => {
        if (!data || !data.count || !Array.isArray(data.rows))
            return;
        setAddresses(data.rows);

    }, [data]);

    useEffect(() => {
        const defAddress = addresses.find(el => el.is_default) ?? addresses[0];
        setDefaultId(defAddress?.id?.toString() ?? null);
    }, [addresses]);

    if(error)
        return <ErrorBox error={error}/>
    
    if(isLoading)
        return <div className="flex justify-center items-center h-full"> <Spinner className="size-6"/></div>

    const handleDelete = async (addressId) => {
        const result = await deleteAddress(userId, addressId);
        if (!result) return;
        setAddresses(prev =>
            prev.filter(addr => addr.id !== addressId)
        );
    };

    const handleAdd = async (address) => {
        const created = await addAddress(userId, address);
        if (!created) return;
        setAddresses(prev => [...prev, created]);
    }

    const handleSetDefault = async (value) => {
        setDefaultId(value);
        setAddresses(prev =>
            prev.map(addr => ({
                ...addr,
                is_default: addr.id.toString() === value,
            }))
        );
        await setDefaultAddress(userId, value);
    };

    return (
        <div className='sm:min-w-[30rem] p-4 flex flex-col gap-4'>
            <div className='flex flex-wrap items-center justify-between  bg-primary-foreground p-6 rounded-lg gap-4'>
                <h2>User addresses</h2>

                <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                    <SheetTrigger asChild>
                        <Button className='ml-6'>
                            Add Address
                        </Button>
                    </SheetTrigger>
                    <AddressSheetContent addNewAddress={(address) => handleAdd(address)} onClose={() => setIsSheetOpen(false)} />
                </Sheet>
            </div>
            <div className='flex flex-wrap items-center justify-between  bg-primary-foreground p-6 rounded-lg gap-4'>
                <p className='font-medium'>Set default address</p>
                <Select
                    value={defaultId}
                    onValueChange={handleSetDefault}
                >
                    <SelectTrigger className="w-[220px]">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {addresses.map(({ city, street, id }) => {
                                return <SelectItem key={id} value={id.toString()}>
                                    {`${city} ${street}`}
                                </SelectItem>
                            })}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div className='flex gap-4 flex-wrap'>
                {addresses.map(({ id, country, postal_code, city, county, street, house }) => {
                    return <div key={id} className='min-w-[18rem] bg-primary-foreground p-4 rounded-lg flex items-center justify-between gap-6'>
                        <div>
                            <p className='font-bold'>{country}, {postal_code}</p>
                            <p className='font-medium'>{city}, {county}</p>
                            <p>{street} {house}</p>
                        </div>
                        <Button disabled={addresses.length < 2} onClick={() => handleDelete(id)} className='!rounded-full !w-10 !h-10' variant="destructive"><ClipboardPaste /> </Button>
                    </div>
                })}

            </div>
        </div>
    );

};

export default Address;