import React from 'react';
import { Link } from 'react-router-dom';
import { SHOP_ROUTE, HELP_ROUTE, HELP_CAT_ROUTE, HELP_FAQ_ROUTE } from '../../../utils/consts/routes';

const BreadCrumbs = ({active, category, faq}) => {
    return (
        <div className="help__breadcrumbs">
            <Link to={SHOP_ROUTE}> home </Link> 
            <span className='breadcrumbs-arrow'>></span>{active === 1 ? <span className='breadcrumbs-active'> customer care </span> : <Link to={HELP_ROUTE}> customer care </Link>} 
            {category && <> <span className='breadcrumbs-arrow'>></span> {active === 2 ? <span className='breadcrumbs-active'> {category?.title} </span> : <Link to={HELP_CAT_ROUTE + category?.link}> {category?.title} </Link>}</>}
            {faq && <> <span className='breadcrumbs-arrow'>></span> {active === 3 ? <span className='breadcrumbs-active'> {faq} </span> : <Link to={HELP_FAQ_ROUTE + '/' + faq}> {faq} </Link>}</>}
        </div>
    );
};

export default BreadCrumbs;