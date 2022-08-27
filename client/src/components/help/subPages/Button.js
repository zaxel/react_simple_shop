import React from 'react';

const Button = ({onLoadMoreClick, disabled}) => {
    return (
        <div className='cat-list__button contact-cont__button-wrapper'>
            <button disabled={disabled} onClick={onLoadMoreClick.bind(this)}>load more</button>
        </div>
    );
};

export default Button;