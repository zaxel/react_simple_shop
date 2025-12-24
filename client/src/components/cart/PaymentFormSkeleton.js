import React from 'react';
import { Skeleton } from '../../shadcn/skeleton';
import { ShoppingCart } from 'lucide-react';
import { Spinner } from '../../shadcn/spinner';

const PaymentFormSkeleton = () => {
    return (
        <div className='w-full lg:w-7/12 shadow-lg border-1 border-gray-100 p-8 rounded-lg flex flex-col gap-8'>
            <Skeleton className="h-[125px] w-full rounded-xl" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
            </div>
            <Skeleton className="h-8 w-[170px]" />
        </div>
    );
};

export default PaymentFormSkeleton;