import React, { useState, useContext, useEffect } from 'react';
import AdminTextInput from '../../commonComponents/AdminTextInput';
import AdminTextArea from '../../commonComponents/AdminTextArea';
import { Context } from '../../../..';
import { changeAboutCardData, fetchCard } from '../../../../utils/staticPages/aboutPage';
import DraggableBlock from './DraggableBlock';
import { observer } from 'mobx-react-lite';
import AddBlocksModal from './AddBlocksModal';


const CommonCard = observer(({ cardId }) => {
    const { aboutPage } = useContext(Context);
    const [addBlocksVisible, setAddBlocksVisible] = useState(false);
    const [buttonStyle, setButtonStyle] = useState('show');
    const card = aboutPage.currentCard;
    const blocks = aboutPage.cardBlocks;
    const cardPosition = {1: 'left', 2: 'middle', 3: 'right'};

    useEffect(() => {
        aboutPage.setActiveBlockEdit(null);
        aboutPage.setActiveCardEdit(cardId);
        fetchCard(aboutPage, cardId);
    }, [])


    const draggableBlocks = blocks.slice().sort((a, b) => a.id - b.id).map(block => <DraggableBlock key={block.id} {...block} />)

    const setInputDataCarry = changeAboutCardData.bind(this, cardId, 'title')
    const setAreaDataCarry = changeAboutCardData.bind(this, cardId, 'card_text')

    const onAddBlocksClick = async() => {
        setAddBlocksVisible(true);
        setButtonStyle('hide');
    }
    const onBlockModalHide = async() => {
        setAddBlocksVisible(false);
        setButtonStyle('show');
    }


    return (
        <div className='admin-pages__page admin-about'>
            <div className='admin-about__container'>
                <h2>Edit {cardPosition[cardId]} about page card: </h2>

                <div className='admin-about__title'>
                    <AdminTextInput inputTitle={'title'} inputText={card.title} cb={setInputDataCarry}/>
                </div>
                <div className='admin-about__area'>
                    <AdminTextArea areaTitle={'card description'} areaText={card.card_text} cb={setAreaDataCarry}/>
                </div>
                <div className='admin-about__blocks'>
                    <h4>edit card content:</h4>
                    <ul className='admin-about__cards-cont'>
                        {draggableBlocks.length ? draggableBlocks : 'this card has no blocks added yet!'}
                    </ul>
                </div>
            </div>
            <button className={buttonStyle} onClick={onAddBlocksClick}>Add Blocks To Card</button>
            <AddBlocksModal show={addBlocksVisible} onHide={onBlockModalHide}/>
        </div>
    );
});

export default CommonCard;