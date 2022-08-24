import React from 'react';
import { ABOUT_ROUTE } from '../../../utils/consts/routes';
import { Link } from 'react-router-dom';

const Button = () => {
    return (
        <div className='cat-list__button contact-cont__button-wrapper'>
            <Link to={ABOUT_ROUTE}>load more</Link>
        </div>
    );
};

export default Button;