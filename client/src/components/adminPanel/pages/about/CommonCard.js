import React, { useState, useContext, useEffect } from 'react';
import AdminTextInput from '../../commonComponents/AdminTextInput';
import AdminTextArea from '../../commonComponents/AdminTextArea';
import { Context } from '../../../..';
import { changeAboutCardData, fetchCard } from '../../../../utils/staticPages/aboutPage';
import DraggableBlock from './DraggableBlock';
import { observer } from 'mobx-react-lite';
import AddBlocksModal from './AddBlocksModal';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const CommonCard = observer(({ cardId }) => {
    const { aboutPage } = useContext(Context);
    const [addBlocksVisible, setAddBlocksVisible] = useState(false);
    const [buttonStyle, setButtonStyle] = useState('show');
    const card = aboutPage.currentCard;
    const blocks = aboutPage.cardBlocks;
    const cardPosition = { 1: 'left', 2: 'middle', 3: 'right' };

    useEffect(() => {
        aboutPage.setActiveBlockEdit(null);
        aboutPage.setActiveCardEdit(cardId);
        fetchCard(aboutPage, cardId);
    }, [])


    const draggableBlocks = blocks.slice()
        .sort((a, b) => a.position - b.position)
        .map(block => {
            return <Draggable key={block.id} draggableId={'draggable-'+block.id} index={block.position}>
                {(provided, snapshot) => (
                    <li className='admin-about__card' key={block.id} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <DraggableBlock {...block} />
                    </li>
                )}
            </Draggable>
        })

    const setInputDataCarry = changeAboutCardData.bind(this, cardId, 'title')
    const setAreaDataCarry = changeAboutCardData.bind(this, cardId, 'card_text')

    const onAddBlocksClick = async () => {
        setAddBlocksVisible(true);
        setButtonStyle('hide');
    }
    const onBlockModalHide = async () => {
        setAddBlocksVisible(false);
        setButtonStyle('show');
    }
    const setBlockPosition = ({destination, source}) => {
        aboutPage.setCardBlockPosition( source.index, destination.index);
    }

    return (
        <DragDropContext
            onDragEnd={setBlockPosition}
        >
            <div className='admin-pages__page admin-about'>
                <div className='admin-about__container'>
                    <h2>Edit {cardPosition[cardId]} about page card: </h2>

                    <div className='admin-about__title'>
                        <AdminTextInput inputTitle={'title'} inputText={card.title} cb={setInputDataCarry} />
                    </div>
                    <div className='admin-about__area'>
                        <AdminTextArea areaTitle={'card description'} areaText={card.card_text} cb={setAreaDataCarry} />
                    </div>
                    <div className='admin-about__blocks'>
                        <h4>add/remove/sort blocks:</h4>
                        <h4>(drag and drop blocks to change position)</h4>
                        <Droppable droppableId="droppable-1">
                            {(provided, snapshot) => (
                                <ul className='admin-about__cards-cont' ref={provided.innerRef} {...provided.droppableProps}>
                                    {draggableBlocks.length ? draggableBlocks : 'this card has no blocks added yet!'}
                                    {provided.placeholder}
                                </ul>
                            )}
                        </Droppable>
                    </div>
                </div>
                <button className={buttonStyle} onClick={onAddBlocksClick}>Add Blocks To Card</button>
                <AddBlocksModal show={addBlocksVisible} onHide={onBlockModalHide} />
            </div>
        </DragDropContext>
    );
});

export default CommonCard;