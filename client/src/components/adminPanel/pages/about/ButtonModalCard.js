import React from 'react';
import { Button } from 'react-bootstrap';

const ButtonModalCard = ({text, link}) => {
    return (
        <li>
              <Button variant="secondary" onClick={()=>console.log('55')}></Button>
              <div className='block-modal__title-cont'>
                <h5>text:</h5>
                <p>{text}</p>
              </div>
              <div className='block-modal__link-cont'>
                <h5>link:</h5>
                <p>{link}</p>
              </div>
            </li>
    );
};

export default ButtonModalCard;