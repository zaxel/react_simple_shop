import React from 'react';

const RateItem = ({rate=0}) => {
    const safeRate = Math.min(5, Math.max(0, rate));
    const width = `${safeRate * 20}%`;
    return (
        <div className='custom-rating'>
            <div className='custom-rating__body'>
                <div className='custom-rating__active' style={{width}}></div>
                <div className='custom-rating__items'>
                    <input type='radio' className='custom-rating__item' value='1' name='custom-rating'></input> 
                    <input type='radio' className='custom-rating__item' value='2' name='custom-rating'></input>
                    <input type='radio' className='custom-rating__item' value='3' name='custom-rating'></input>
                    <input type='radio' className='custom-rating__item' value='4' name='custom-rating'></input>
                    <input type='radio' className='custom-rating__item' value='5' name='custom-rating'></input> 
                </div> 

            </div>
            <div className='custom-rating__value'>{rate}</div>
        </div>
    );
};

export default RateItem;