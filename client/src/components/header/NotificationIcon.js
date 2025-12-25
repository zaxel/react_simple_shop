import React from 'react';
import { Link } from 'react-router-dom';
import { PROFILE_ROUTE, LOGIN_ROUTE } from '../../utils/consts/routes';
import { Bell } from 'lucide-react';

const NotificationIcon = ({isAuth, history, notificationCount = 0}) => {
    return (
         <Link onClick={()=>history.setLastPath(PROFILE_ROUTE)} to={isAuth ? PROFILE_ROUTE : LOGIN_ROUTE} className='relative'>
            <Bell className="text-navbar-icon"/>
            {notificationCount!==0 && <span className='absolute -top-2 -right-3 bg-green-600 text-navbar-icon rounded-full w-5 h-5 flex justify-center items-center text-xs font-medium'> {notificationCount > 99 ? '99+' : notificationCount}</span>}
        </Link> 
    );
};

export default NotificationIcon;