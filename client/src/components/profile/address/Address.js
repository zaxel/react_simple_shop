import React, { useState } from 'react';
import { Sheet, SheetTrigger } from '../../../shadcn/sheet';
import { Button } from '../../../shadcn/button';
import { ClipboardPaste } from 'lucide-react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../../../shadcn/select';
import AddressSheetContent from './AddressSheetContent';

const addressesList = [
    {
        id: 1,
        country: "US",
        zip: "NY 10003",
        city: "New York",
        county: "New York",
        street: "Cooper Square",
        house: "20",
        default: false
    },
    {
        id: 2,
        country: "US",
        zip: "NY 11205",
        city: "New York",
        county: "Brooklyn",
        street: "Bedford Ave",
        house: "1100",
        default: false
    },
    {
        id: 3,
        country: "US",
        zip: "NY 11373",
        city: "New York",
        county: "Elmhurst",
        street: "73rd St",
        house: "41-01",
        default: false
    },
    {
        id: 4,
        country: "US",
        zip: "NY 10314",
        city: "New York",
        county: "Staten Island",
        street: "Richmond Ave",
        house: "1500",
        default: true
    },
    {
        id: 5,
        country: "UK",
        zip: "SL3 8AP",
        city: "London",
        county: "Slough",
        street: "Torent rd",
        house: "34",
        default: false
    },
]
const Address = () => {
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const [addresses, setAddresses] = useState(addressesList);
    const defAddress = addresses.find(el => el.default === true) ?? addresses[0];
    const [defaultId, setDefaultId] = useState(defAddress.id.toString());

    const onRemoveAddressHandler = removeId => {
        if (addresses.length < 2) return;
        if (removeId.toString() === defaultId) {
            const remaining = addresses.filter(el => el.id !== removeId);
            const newDefaultId = remaining[0].id.toString();
            setDefaultId(newDefaultId);
            setAddresses(prev =>
                prev.map(el =>
                    el.id === newDefaultId
                        ? { ...el, default: true }
                        : { ...el, default: false }
                )
            );
        }
        setAddresses(prev =>
            prev.filter(el => el.id !== removeId)
        );
    }
    const addNewAddress = address => {
        setAddresses(prev=> [...prev, {...address, default: false, id: Date.now()}]);
    }

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
                    <AddressSheetContent  addNewAddress={addNewAddress} onClose={() => setIsSheetOpen(false)}/>
                </Sheet>
            </div>
            <div className='flex flex-wrap items-center justify-between  bg-primary-foreground p-6 rounded-lg gap-4'>
                <p className='font-medium'>Set default address</p>
                <Select
                    value={defaultId}
                    onValueChange={(value) => {
                        setDefaultId(value);
                        setAddresses(prev =>
                            prev.map(addr => ({
                                ...addr,
                                default: addr.id.toString() === value,
                            }))
                        );
                    }}
                >
                    <SelectTrigger className="w-[220px]">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {addresses.map(({ zip, city, street, id }) => {
                                return <SelectItem key={id} value={id.toString()}>
                                    {`${city} ${street}`}
                                </SelectItem>
                            })}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div className='flex gap-4 flex-wrap'>
                {addresses.map(({ id, country, zip, city, county, street, house }) => {
                    return <div key={id} className='min-w-[18rem] bg-primary-foreground p-4 rounded-lg flex items-center justify-between gap-6'>
                        <div>
                            <p className='font-bold'>{country}, {zip}</p>
                            <p className='font-medium'>{city}, {county}</p>
                            <p>{street} {house}</p>
                        </div>
                        <Button disabled={addresses.length < 2} onClick={() => onRemoveAddressHandler(id)} className='!rounded-full !w-10 !h-10' variant="destructive"><ClipboardPaste /> </Button>
                    </div>
                })}

            </div>
        </div>


    );

};

export default Address;