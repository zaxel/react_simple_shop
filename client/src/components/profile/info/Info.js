import { Avatar, AvatarFallback, AvatarImage } from '../../../shadcn/avatar';
import { Badge } from '../../../shadcn/badge';
import { Sheet, SheetTrigger } from '../../../shadcn/sheet';
import { Button } from '../../../shadcn/button';
import InfoSheetContent from './InfoSheetContent';
import { useEffect, useContext, useState } from 'react';
import { Context } from '../../..';
import useFetch from '../../../utils/http/useFetch';
import { updateUserData } from '../../../http/userAPI';
import { Spinner } from '../../../shadcn/spinner';
import ErrorBox from '../../ErrorBox';

const Info = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const { user } = useContext(Context);
  const firstName = user.user?.name || "";
  const surName = user.user?.surname || "";
  const userFullName = (!firstName && !surName) ? "User" : `${firstName} ${surName}`;
  const initials = `${firstName[0] || ''}${surName[0] || ''}` || 'U';

  const userId = user.user?.id;
  const url = userId ? `api/user/info/${userId}` : null;

  const { data, error, isLoading } = useFetch(url, null, true);

  useEffect(() => {
    if (!data)
      return;

    user.updateUser(data);

  }, [data]);

  const handleEdit = async data => {
    const res = await updateUserData(userId, data);
    if (!res) return;
    user.updateUser(data);
  }

  const getFormattedDate = timestamp => {
    if (!timestamp) return "unknown date";
    const dateObj = new Date(timestamp);
    const date = dateObj.toLocaleDateString("en-GB");
    const time = dateObj.toLocaleTimeString("en-GB");
    return `${date} ${time}`;
  }
  if (error)
    return <ErrorBox error={error} />

  if (isLoading)
    return <div className="flex justify-center items-center h-[75vh]"> <Spinner /></div>

  return (
    <div className='sm:min-w-[30rem] bg-primary-foreground p-4 rounded-lg flex flex-col gap-6'>
      <div className='flex items-center justify-between'>
        <h2>User Information</h2>
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <Button className='ml-6'>
              Edit User
            </Button>
          </SheetTrigger>
          <InfoSheetContent user={user.user} onClose={() => setIsSheetOpen(false)} editUser={(user) => handleEdit(user)} />
        </Sheet>
      </div>
      <div className='flex items-center gap-2'>
        <Avatar className='size-6'>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <span>{userFullName}</span> 
      </div>

      <div className='flex items-center gap-2'>
        <p className='font-bold font-s'>Phone:</p>
        <p className=''>{user.user?.phone || "no phone added"}</p>
      </div>

      <div className='flex items-center gap-2'>
        <p className='font-bold'>Email:</p>
        <p className=''>{user.user?.email || "no email added"}</p>
      </div>
      <div className='flex items-center gap-2'>
        <p className='font-bold'>Role:</p>
        <Badge >{user.user?.role}</Badge>
      </div>
      <p className='text-sm text-muted-foreground'>Joined on {getFormattedDate(user.user?.createdAt)}</p>
    </div>
  );
};

export default Info;