import React, { useState, useContext, useEffect } from 'react';
import AdminTextInput from '../../commonComponents/AdminTextInput';
import { Spinner } from 'react-bootstrap';
import AdminTextArea from '../../commonComponents/AdminTextArea';
import { Context } from '../../../..';
import hero from '../../../../assets/about/brand_hero_7.gif'
import { fetchCard } from '../../../../utils/staticPages/aboutPage';
import DraggableBlock from './DraggableBlock';
import { observer } from 'mobx-react-lite';


const CommonCard = observer(({ cardId }) => {
    const { aboutPage } = useContext(Context);
    const card = aboutPage.currentCard;
    const blocks = aboutPage.cardBlocks;

    useEffect(() => {
        aboutPage.setActiveBlockEdit(null);
        fetchCard(aboutPage, cardId);
    }, [])


    const draggableBlocks = blocks.slice().sort((a, b) => a.id - b.id).map(block => <DraggableBlock key={block.id} {...block} />)

    console.log(card)


    // useEffect(() => {
    //     if (aboutPage.activeBlockEdit === block.id) {
    //         setArrowStyle('arrowDown');
    //         setDisplayDescr(true);
    //     } else {
    //         setArrowStyle('arrow');
    //         setDisplayDescr(false);
    //     }
    // }, [aboutPage.activeBlockEdit])

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
                <h2>Edit {'left'} about page card: </h2>

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

        </div>
    );
});

export default CommonCard;