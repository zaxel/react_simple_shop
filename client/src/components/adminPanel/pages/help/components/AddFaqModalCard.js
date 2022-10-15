import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { Context } from '../../../../..';


const AddFaqModalCard = ({ question, id }) => {
  const { helpAdmin } = useContext(Context);
  // const currentCard = aboutPage.activeCardEdit; 
  const addBlock = async (id) => { 
    console.log({id})
    console.log(helpAdmin.activeCatBody)
    // const nextPosition = aboutPage.cardBlocks.length + 1;
    // aboutPage.setLoading(true);
    // await changeAboutBlockData(id, 'infoAboutCardId', currentCard)
    // await changeAboutBlockData(id, 'position', nextPosition)
    // aboutPage.setEditBlockCardIdAndPos(id, nextPosition);
    // aboutPage.setLoading(false);
  }

  return (
    <li>
      <Button variant="secondary" onClick={() => addBlock(id)}></Button>
      <div className='block-modal__title-cont adminFaq-modal__title-cont'> 
        <h5>{question}</h5>
      </div>
    </li>
  );
};

export default AddFaqModalCard;