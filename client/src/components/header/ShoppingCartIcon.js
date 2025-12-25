import React from 'react';
import { Link } from 'react-router-dom';
import { CART_ROUTE, LOGIN_ROUTE } from '../../utils/consts/routes';
import { ShoppingCart } from 'lucide-react';

const ShoppingCartIcon = ({itemsCount, isAuth, history}) => {
    return (
         <Link onClick={()=>history.setLastPath(CART_ROUTE)} to={isAuth ? CART_ROUTE : LOGIN_ROUTE} className='relative'>
            <ShoppingCart className="text-navbar-icon"/>
            {itemsCount!==0 && <span className='absolute -top-2 -right-3 bg-navbar-icon-count text-navbar-icon rounded-full w-5 h-5 flex justify-center items-center text-xs font-medium'> {itemsCount > 99 ? '99+' : itemsCount}</span>}
        </Link>
    );
};

export default ShoppingCartIcon;