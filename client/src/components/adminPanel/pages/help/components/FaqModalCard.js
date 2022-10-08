import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { Context } from '../../../../..';

const FaqModalCard = ({ category, text, id }) => {
    console.log(category)
    const { helpAdmin } = useContext(Context);
    //   const currentCard = helpAdmin.activeCardEdit;
    const addBlock = async (id) => {
        // const nextPosition = aboutPage.cardBlocks.length + 1;
        helpAdmin.setLoading(true);
        // await changeAboutBlockData(id, 'infoAboutCardId', currentCard)
        // await changeAboutBlockData(id, 'position', nextPosition)
        // helpAdmin.setEditBlockCardIdAndPos(id, nextPosition);
        helpAdmin.setLoading(false);
    }

    return (
        <li>
            <Button variant="secondary" onClick={() => addBlock(id)}></Button>
            <div className='block-modal__link-cont'>
                <h5>category:</h5>
                <p>{category}</p>
            </div>
            <div className='block-modal__title-cont faq-modal__title-cont'>
                <h5>question:</h5>
                <p>{text}</p>
            </div>
            
        </li>
    );
};

export default FaqModalCard;