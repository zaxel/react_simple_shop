import React from 'react';
import { ABOUT_ROUTE } from '../../../utils/consts/routes';
import { Link } from 'react-router-dom';

const Button = ({onLoadMoreClick, disabled}) => {
    return (
        <div className='cat-list__button contact-cont__button-wrapper'>
            {/* <Link to={ABOUT_ROUTE}>load more</Link> */}
    
            <button disabled={disabled} onClick={onLoadMoreClick.bind(this)}>load more</button>
        </div>
    );
};

export default Button;