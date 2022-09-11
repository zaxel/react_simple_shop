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
                        <div className='about-blocks__add-btns'>
                            <form className='about-blocks__form blocks-form'>
                                <div className='blocks-form__title'>
                                    {/* <input type={'text'} placeholder='button text' value={newBtnText} onChange={(e)=>setNewBtnText(e.currentTarget.value)}/> */}
                                    <h5>new title:</h5>
                                    <input type={'text'} placeholder='block title' />
                                </div>
                                <div className='blocks-form__text'>
                                    {/* <input type={'text'} placeholder='button link' value={newBtnLink} onChange={(e)=>setNewBtnLink(e.target.value)}/> */}
                                    <h5>new description:</h5>
                                    <textarea placeholder='block description' />
                                </div>
                                <div className='blocks-form__imgs-cont'>
                                    <h3>Edit images</h3>
                                    <div className='block-form__img-cards'>
                                        <div className='block-form__img-card'>
                                            <h4>main hero:</h4>
                                            <div className='block-form__img-wrapper'>
                                                <div className='block-form__img' >
                                                    <img src={hero} alt={'hero'} />
                                                </div>
                                                <div className='block-form__img-edit'>
                                                    <input type='file' accept="image/*" onChange={() => console.log(99)} onClick={() => console.log('click')} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='block-form__img-card'>
                                            <h4>small screen hero:</h4>
                                            <div className='block-form__img-wrapper'>
                                                <div className='block-form__img' >
                                                    <img src={heroSmall} alt={'small hero'} />
                                                </div>
                                                <div className='block-form__img-edit'>
                                                    <input type='file' accept="image/*" onChange={() => console.log(99)} onClick={() => console.log('click')} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button className='block-form__new-block'>add new block</button>
                            </form>
                        </div>}
                </div>
            </div>
            <AddBtnsModal show={addBtnsVisible} onHide={() => setAddBtnsVisible(false)}/>
        </div>
    );
});

export default Blocks;