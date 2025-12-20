import React from 'react';
import { Link } from 'react-router-dom';
import { CART_ROUTE } from '../../utils/consts/routes';
import { ShoppingCart } from 'lucide-react';

const ShoppingCartIcon = ({itemsCount}) => {
    return (
         <Link to={CART_ROUTE} className='relative'>
            <ShoppingCart className="text-navbar-icon"/>
            <span className='absolute -top-2 -right-3 bg-navbar-icon-count text-navbar-icon rounded-full w-5 h-5 flex justify-center items-center text-xs font-medium'>{itemsCount ?? 0}</span>
        </Link>
    );
};

export default ShoppingCartIcon;