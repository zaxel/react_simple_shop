import React from 'react';

const RateItem = ({rate=0}) => {
    const width = rate*20;
    return (
        <div className='rating'>
            <div className='rating__body'>
                <div className='rating__active' style={{width}}></div>
                <div className='rating__items'>
                    <input type='radio' className='rating__item' value='1' name='rating'></input> 
                    <input type='radio' className='rating__item' value='2' name='rating'></input>
                    <input type='radio' className='rating__item' value='3' name='rating'></input>
                    <input type='radio' className='rating__item' value='4' name='rating'></input>
                    <input type='radio' className='rating__item' value='5' name='rating'></input> 
                </div> 

            </div>
            <div className='rating__value'>{rate}</div>
        </div>
    );
};

export default RateItem;