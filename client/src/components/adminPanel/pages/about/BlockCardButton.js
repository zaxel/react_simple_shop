import React, {useContext} from 'react';
import { Context } from '../../../..';
import { updateBlockBtns } from '../../../../utils/staticPages/aboutPage';


const BlockCardButton = ({ text, link, id, blockId }) => {
    const {aboutPage} = useContext(Context);

    const addBtn = async () => {
        const currentBlock = aboutPage.editBlocks.find(el=>el.block.id === blockId);
        const btnsCopy = { ...currentBlock.buttons };
        delete btnsCopy[id];
        updateBlockBtns(btnsCopy, aboutPage);
    }

    return (
        <li className='about-blocks__body-btn'>
            <button onClick={addBtn}>{text}</button>
        </li>
    )
};

export default BlockCardButton;