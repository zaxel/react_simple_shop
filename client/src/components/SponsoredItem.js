import React from 'react';
import image from '../assets/iPhone11.jpg';
import star from '../assets/rating_star.png';
import { Button, Modal, Form } from 'react-bootstrap';

const SponsoredItem = ({el}) => {
    
    return (
        <div className='basket-sponsored'>
            <div className='basket-sponsored__img'>
                <img src={process.env.REACT_APP_API_URL + el.img} alt='basket random item' />
            </div>
            <div className='basket-sponsored__descr-cont'>
                <h4>{el.name}</h4>
                <div className='basket-sponsored__price-cont'>
                    <div className='basket-sponsored__star'>{el.rate} 
                        <img src={star} alt='rating star'/>
                    </div>
                    <h5>${el.price}</h5>
                </div>
                <Button variant="warning" className='basket-aside__button'>Add to Cart</Button>
            </div>
        </div>
    );
};

export default SponsoredItem;