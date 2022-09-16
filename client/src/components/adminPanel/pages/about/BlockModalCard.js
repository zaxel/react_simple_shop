import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { Context } from '../../../..';
import { changeAboutBlockData } from '../../../../utils/staticPages/aboutPage';


const BlockModalCard = ({ text, title, id }) => {
  const { aboutPage } = useContext(Context);
  const currentCard = aboutPage.activeCardEdit;
  const addBlock = async (id) => {
    const nextPosition = aboutPage.cardBlocks.length + 1;
    aboutPage.setLoading(true);
    await changeAboutBlockData(id, 'infoAboutCardId', currentCard)
    await changeAboutBlockData(id, 'position', nextPosition)
    aboutPage.setEditBlockCardIdAndPos(id, nextPosition);
    aboutPage.setLoading(false);
  }

  return (
    <li>
      <Button variant="secondary" onClick={() => addBlock(id)}></Button>
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