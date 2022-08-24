import React from 'react';

const Banner = () => {
    return (
        <div className='help__banner help-banner'>
            <h3>CUSTOMER CARE</h3>
            <div className='help-banner__container'>
                <input type="text" placeholder="Search for help" />
                <button onClick={() => console.log('search')} />
            </div>
        </div>
    );
};

export default Banner;