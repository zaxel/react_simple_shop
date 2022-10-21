import React from 'react';

const CategoryBanner = ({title, banner}) => {
   
    return (
        <div className='help__cat-banner'> 
            <img src={banner && process.env.REACT_APP_API_URL + banner} alt='help category hero'/> 
            <h3>{title}</h3>
        </div>
    );
};

export default CategoryBanner;