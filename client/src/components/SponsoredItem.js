import React from 'react';
import image from '../assets/iPhone11.jpg';
import star from '../assets/rating_star.png';
import { Button, Modal, Form } from 'react-bootstrap';

const SponsoredItem = () => {
    return (
        <div className='basket-sponsored'>
            <div className='basket-sponsored__img'>
                <img src={image} alt='sponsored item'/>
            </div>
            <div className='basket-sponsored__descr-cont'>
                <h4>Sceptre 24" Professional Thin 75Hz 1080p LED Monitor 2x HDMI VGA Build-in Speakers</h4>
                <div className='basket-sponsored__price-cont'>
                    <div className='basket-sponsored__star'>4.2 
                        <img src={star} alt='rating star'/>
                    </div>
                    <h5>$140.50</h5>
                </div>
                <Button variant="warning" className='basket-aside__button'>Add to Cart</Button>
            </div>
        </div>
    );
};

export default SponsoredItem;