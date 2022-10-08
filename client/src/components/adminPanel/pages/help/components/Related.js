import React, { useContext } from 'react';
import { Context } from '../../../../..';

const Related = ({question}) => {
    const {helpAdmin} = useContext(Context);

    const addBtn = async () => {
        // const currentBlock = aboutPage.editBlocks.find(el=>el.block.id === blockId);
        // const btnsCopy = { ...currentBlock.buttons };
        // delete btnsCopy[id];
        // updateBlockBtns(btnsCopy, aboutPage);
    }

    return (
        <li className='adminFaq__related'>
            <button onClick={addBtn}>{question}</button>
        </li>
    )
};

export default Related;