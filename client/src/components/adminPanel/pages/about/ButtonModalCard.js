import React, {useContext} from 'react';
import { Button } from 'react-bootstrap';
import { Context } from '../../../..';
import { updateBlockBtns } from '../../../../utils/staticPages/aboutPage';


const ButtonModalCard = ({text, link, id}) => {
    const { aboutPage } = useContext(Context);
    const allButtons = aboutPage.buttonsModal;
    const currentBlock = aboutPage.editBlocks.find(el=>el.block.id === aboutPage.activeBlockEdit);
    
    const addBtn = async() => {
        const btnsCopy = {...currentBlock.buttons};
        btnsCopy[id] = allButtons[id];
        updateBlockBtns(btnsCopy, aboutPage);
    }

    return (
        <li>
              <Button variant="secondary" onClick={()=>addBtn(id)}></Button>
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