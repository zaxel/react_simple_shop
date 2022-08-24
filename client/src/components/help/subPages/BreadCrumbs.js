import React from 'react';
import { Link } from 'react-router-dom';
import { SHOP_ROUTE } from '../../../utils/consts/routes';

const BreadCrumbs = () => {
    return (
        <div className="help__breadcrumbs">
            <Link to={SHOP_ROUTE}> home </Link> {'>'} <Link to={SHOP_ROUTE}> delivery </Link> {'>'} <Link to={SHOP_ROUTE}> how-can-I-track-shipping </Link>
        </div>
    );
};

export default BreadCrumbs;