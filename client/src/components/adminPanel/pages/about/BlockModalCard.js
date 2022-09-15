import React, {useContext} from 'react';
import { Button } from 'react-bootstrap';
import { Context } from '../../../..';
import { updateBlockBtns } from '../../../../utils/staticPages/aboutPage';


const BlockModalCard = ({text, title, id}) => {
    const { aboutPage } = useContext(Context);
    const allButtons = aboutPage.buttonsModal;
    const currentBlock = aboutPage.editBlocks.find(el=>el.block.id === aboutPage.activeBlockEdit);
    
    const addBlock = async(id) => {
      console.log('add block', id)
        // const btnsCopy = {...currentBlock.buttons};
        // btnsCopy[id] = allButtons[id];
        // updateBlockBtns(btnsCopy, aboutPage);
    }

    return (
        <li>
              <Button variant="secondary" onClick={()=>addBlock(id)}></Button>
              <div className='block-modal__title-cont'>
                <h5>title:</h5>
                <p>{title}</p>
              </div>
              <div className='block-modal__link-cont'>
                <h5>text:</h5>
                <p>{text}</p>
              </div>
            </li>
    );
};

export default BlockModalCard;