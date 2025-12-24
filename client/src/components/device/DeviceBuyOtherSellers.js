import React from 'react';
import { Link } from 'react-router-dom';
import { formatUSCurrency } from '../../utils/dataFormat/currencies';
import { SHOP_ROUTE } from '../../utils/consts/routes';

const DeviceBuyOtherSellers = () => {
    return (
        <div className='device__other-sellers dev-other'>
            <h3>Other sellers on Arazon</h3>
            <Link to={SHOP_ROUTE}>New & Used (63) from <span>{formatUSCurrency(7.13)} & FREE Delivery</span> on your first eligible order to UK or Ireland.</Link>
        </div>
    );
};

export default DeviceBuyOtherSellers;