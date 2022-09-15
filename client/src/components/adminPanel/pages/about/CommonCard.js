import React, { useState, useContext, useEffect } from 'react';
import AdminTextInput from '../../commonComponents/AdminTextInput';
import { Spinner } from 'react-bootstrap';
import AdminTextArea from '../../commonComponents/AdminTextArea';
import { Context } from '../../../..';
import hero from '../../../../assets/about/brand_hero_7.gif'
import { fetchCard } from '../../../../utils/staticPages/aboutPage';
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
        fetchCard(aboutPage, cardId);
    }, [])


    const draggableBlocks = blocks.slice().sort((a, b) => a.id - b.id).map(block => <DraggableBlock key={block.id} {...block} />)

    const onAddBlocksClick = async() => {
        setAddBlocksVisible(true);
        setButtonStyle('hide');
        // aboutPage.setModalBtnsLoading(true);
        // await fetchBtnsModal(aboutPage);
        // aboutPage.setModalBtnsLoading(false);
    }
    const onBlockModalHide = async() => {
        setAddBlocksVisible(false);
        setButtonStyle('show');
    }


    // if (aboutPage.loading) {
    //     return (
    //         <div className="spinner">
    //             <Spinner animation="border" />
    //         </div>
    //     )
    // }
    return (
        <div className='admin-pages__page admin-about'>
            <div className='admin-about__container'>
                <h2>Edit {cardPosition[cardId]} about page card: </h2>

                <div className='admin-about__title'>
                    <AdminTextInput inputTitle={'title'} inputText={card.title} />
                    {/* <AdminTextInput inputTitle={'title'} inputText={'title'} cb={changeCardTitleCarried}/> */}
                </div>
                <div className='admin-about__area'>
                    <AdminTextArea areaTitle={'card description'} areaText={card.card_text} />
                    {/* <AdminTextArea inputTitle={'text'} inputText={'card_prev_text'} cb={changeCardTextCarried}/> */}
                </div>
                <div className='admin-about__blocks'>
                    <h4>edit card content:</h4>
                    <ul className='admin-about__cards-cont'>

                        {draggableBlocks}
                    </ul>
                </div>
            </div>
            <button className={buttonStyle} onClick={onAddBlocksClick}>Add Blocks To Card</button>
            <AddBlocksModal show={addBlocksVisible} onHide={onBlockModalHide}/>
        </div>
    );
});

export default CommonCard;