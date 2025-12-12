import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../../../shadcn/avatar';
import { Badge } from '../../../shadcn/badge';
import { Sheet, SheetTrigger } from '../../../shadcn/sheet';
import { Button } from '../../../shadcn/button';
import InfoSheetContent from './InfoSheetContent';

const Info = () => {
  return (
    <div className='sm:min-w-[30rem] bg-primary-foreground p-4 rounded-lg flex flex-col gap-6'>
      <div className='flex items-center justify-between'>
        <h2>User Information</h2>
        <Sheet>
          <SheetTrigger asChild>
            <Button className='ml-6'>
              Edit User
            </Button>
          </SheetTrigger>
         <InfoSheetContent />
        </Sheet>
      </div>
      <div className='flex items-center gap-2'>
        <Avatar className='size-6'>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <span>Michael Brown</span>
      </div>

      <div className='flex items-center gap-2'>
        <p className='font-bold font-s'>Phone:</p>
        <p className=''>+1 234 56789</p>
      </div>

      <div className='flex items-center gap-2'>
        <p className='font-bold'>Email:</p>
        <p className=''>user@gmail.com</p>
      </div>
      <div className='flex items-center gap-2'>
        <p className='font-bold'>Role:</p>
        <Badge >admin</Badge>
      </div>
      <p className='text-sm text-muted-foreground'>Joined on 12.12.2012</p>
    </div>
  );
};

export default Info;