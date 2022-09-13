import React, { useState, useContext, useEffect } from 'react';
import { Context } from '../../../..';
import AdminImage from '../../commonComponents/AdminImage';
import { Spinner } from 'react-bootstrap';
import AdminTextInput from '../../commonComponents/AdminTextInput';
import hero from '../../../../assets/about/exp_hero_1.jpg';
import heroSmall from '../../../../assets/about/exp_hero_3.jpg';
import AddBtnsModal from './AddBtnsModal';
import BlockCard from './BlockCard';
import { observer } from 'mobx-react-lite';
import { fetchBlocks, fetchBtnsModal } from '../../../../utils/staticPages/aboutPage';
import AddNewBlock from './AddNewBlock';


const Blocks = observer(() => {
    const {aboutPage} = useContext(Context);
    const [addBtnsVisible, setAddBtnsVisible] = useState(false);
    const [newBlockLoading, setNewBlockLoading] = useState(false);
    
    const onAddBtnsClick = async() => {
        setAddBtnsVisible(true);
        aboutPage.setModalBtnsLoading(true);
        await fetchBtnsModal(aboutPage);
        aboutPage.setModalBtnsLoading(false);
    }

    useEffect(()=>{
        fetchBlocks(aboutPage);
        fetchBtnsModal(aboutPage);
    }, [])

    const blockCards = aboutPage.editBlocks.slice()
        .sort((a,b)=>a.block.id-b.block.id)
        .map(card=><BlockCard key={card.block.id} onAddBtnsClick={onAddBtnsClick} {...card}/>);

    if (aboutPage.loading) {
        return (
            <div className="spinner">
                <Spinner animation="border" />
            </div>
        )
    }
    return (
        <div className='admin-pages__page about-blocks'>
            <div className='admin-pages__container about-blocks__container'>
                <h2>Edit blocks of About Page".</h2>
                <div className='about-blocks__blocks'>
                    <h4>edit existing blocks:</h4>
                    <ul className='about-blocks__cards-cont'>
                        {blockCards}
                    </ul>
                    <h4>create new block:</h4>
                    {newBlockLoading ?
                        <div className="spinner about-blocks__spinner">
                            <Spinner animation="border" />
                        </div> :
                        <AddNewBlock/>}
                </div>
            </div>
            <AddBtnsModal show={addBtnsVisible} onHide={() => setAddBtnsVisible(false)}/>
        </div>
    );
});

export default Blocks;