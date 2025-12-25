import React from 'react';
import { Link } from 'react-router-dom';
import { PROFILE_WISHLIST_ROUTE, LOGIN_ROUTE } from '../../utils/consts/routes';
import { Heart } from 'lucide-react';
import { observer } from 'mobx-react-lite';

const WishListIcon = ({history, user}) => {
    const isAuth = user?.isAuth;
    const itemsCount = user?.wishlist.size ?? 0;
    return (
         <Link onClick={()=>history.setLastPath(PROFILE_WISHLIST_ROUTE)} to={isAuth ? PROFILE_WISHLIST_ROUTE : LOGIN_ROUTE} className='relative'>
            <Heart className="text-navbar-icon"/>
            {itemsCount!==0 && <span className='absolute -top-2 -right-3 bg-gray-400 text-navbar-icon rounded-full w-5 h-5 flex justify-center items-center text-xs font-medium'> {itemsCount > 99 ? '99+' : itemsCount}</span>}
        </Link>
    );
};

export default observer(WishListIcon);