import React, { useState, useContext, useEffect } from 'react';
import AdminTextInput from '../../commonComponents/AdminTextInput';
import { Spinner } from 'react-bootstrap';
import AdminTextArea from '../../commonComponents/AdminTextArea';
import { Context } from '../../../..';
import hero from '../../../../assets/about/brand_hero_7.gif'

const CommonCard = () => {
    const { aboutPage } = useContext(Context);

    const [arrowStyle, setArrowStyle] = useState('about-arrow');
    const [displayDescr, setDisplayDescr] = useState(false);

    const changeStyle = () => {
        arrowStyle === 'about-arrow' ? setArrowStyle('about-arrowDown') : setArrowStyle('about-arrow')
        arrowStyle === 'about-arrow' ? setDisplayDescr(true) : setDisplayDescr(false);
        // aboutPage.activeBlockEdit === block.id ? aboutPage.setActiveBlockEdit(null) : aboutPage.setActiveBlockEdit(block.id);
    }
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
                    <AdminTextInput inputTitle={'title'} inputText={'title'} />
                    {/* <AdminTextInput inputTitle={'title'} inputText={'title'} cb={changeCardTitleCarried}/> */}
                </div>
                <div className='admin-about__area'>
                    <AdminTextArea areaTitle={'card description'} areaText={'some text here'} />
                    {/* <AdminTextArea inputTitle={'text'} inputText={'card_prev_text'} cb={changeCardTextCarried}/> */}
                </div>
                <div className='admin-about__blocks'>
                    <h4>edit card content:</h4>
                    <ul className='admin-about__cards-cont'>
                        <li className='admin-about__card'>
                            <div className='admin-about__card-header'>
                                <div className='admin-about__card-title'>
                                    <h3>Title:</h3>
                                    <p>{'block.title'}</p>
                                </div>
                                <div className='admin-about__card-text'>
                                    <h3>Text (first two lines):</h3>
                                    <p>{'block.text'}</p>
                                </div>
                                <div className='admin-about__card-del'>
                                    {/* <button onClick={() => deleteBlock(aboutPage, block.id)}>X</button> */}
                                    <button onClick={() => console.log(99)}>X</button>
                                </div>
                                <div className='admin-about__card-button'>
                                    <button onClick={changeStyle} className={arrowStyle}></button>
                                    {/* <button onClick={changeStyle} className={arrowStyle}></button> */}
                                </div>
                            </div>
                            {displayDescr && <div className='admin-about__card-body'>
                                <h3 className='admin-about__body-title'>
                                    this is some title
                                </h3>
                                <p className='admin-about__body-text'>
                                    We believe in a world where you have total freedom to be you, without judgement. To experiment. To express yourself. To be brave and grab life as the extraordinary adventure it is. So we make sure everyone has an equal chance to discover all the amazing things they’re capable of – no matter who they are, where they’re from or what looks they like to boss. We exist to give you the confidence to be whoever you want to be.
                                </p>
                                <div className='admin-about__body-img'>
                                    <img alt='hero' src={hero} />
                                </div>
                                <div className='admin-about__body-battons'>
                                    <ul className='admin-about__body-btns'>
                                        {/* {blockCardButtons || <li>No buttons added</li>} */}
                                        <li className='admin-about__body-btn'>
                                            <span>{'text'}</span>
                                        </li>
                                        <li className='admin-about__body-btn'>
                                            <span>{'another button'}</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>}
                        </li>
                        <li className='admin-about__card'>
                            <div className='admin-about__card-header'>
                                <div className='admin-about__card-title'>
                                    <h3>Title:</h3>
                                    <p>{'block.title'}</p>
                                </div>
                                <div className='admin-about__card-text'>
                                    <h3>Text (first two lines):</h3>
                                    <p>{'block.text'}</p>
                                </div>
                                <div className='admin-about__card-del'>
                                    {/* <button onClick={() => deleteBlock(aboutPage, block.id)}>X</button> */}
                                    <button onClick={() => console.log(99)}>X</button>
                                </div>
                                <div className='admin-about__card-button'>
                                    <button onClick={changeStyle} className={'about-arrow'}></button>
                                    {/* <button onClick={changeStyle} className={arrowStyle}></button> */}
                                </div>
                            </div>
                            {false && <div className='about-edit__card-body'>
                                <div className='about-edit__body-title'>
                                    <AdminTextInput inputTitle={'Title'} inputText={'block.title'} />
                                </div>
                                <div className='about-edit__body-text'>
                                    <AdminTextInput inputTitle={'Text'} inputText={'block.text'} />
                                </div>

                                <div className='about-edit__body-battons'>
                                    <h3>Buttons:</h3>
                                    <div className='about-edit__battons-wrapper'>
                                        <ul className='about-edit__body-btns'>
                                            {/* {blockCardButtons || <li>No buttons added</li>} */}
                                            <li>No buttons added</li>
                                        </ul>
                                        <div className='about-edit__btn-add'>
                                            <button onClick={() => console.log(99)}>add buttons</button>
                                            {/* <button >add buttons</button> */}
                                        </div>
                                    </div>

                                </div>
                            </div>}
                        </li>
                        <li className='admin-about__card'>
                            <div className='admin-about__card-header'>
                                <div className='admin-about__card-title'>
                                    <h3>Title:</h3>
                                    <p>{'block.title'}</p>
                                </div>
                                <div className='admin-about__card-text'>
                                    <h3>Text (first two lines):</h3>
                                    <p>{'block.text'}</p>
                                </div>
                                <div className='admin-about__card-del'>
                                    {/* <button onClick={() => deleteBlock(aboutPage, block.id)}>X</button> */}
                                    <button onClick={() => console.log(99)}>X</button>
                                </div>
                                <div className='admin-about__card-button'>
                                    <button onClick={changeStyle} className={'about-arrow'}></button>
                                    {/* <button onClick={changeStyle} className={arrowStyle}></button> */}
                                </div>
                            </div>
                            {false && <div className='about-edit__card-body'>
                                <div className='about-edit__body-title'>
                                    <AdminTextInput inputTitle={'Title'} inputText={'block.title'} />
                                </div>
                                <div className='about-edit__body-text'>
                                    <AdminTextInput inputTitle={'Text'} inputText={'block.text'} />
                                </div>

                                <div className='about-edit__body-battons'>
                                    <h3>Buttons:</h3>
                                    <div className='about-edit__battons-wrapper'>
                                        <ul className='about-edit__body-btns'>
                                            {/* {blockCardButtons || <li>No buttons added</li>} */}
                                            <li>No buttons added</li>
                                        </ul>
                                        <div className='about-edit__btn-add'>
                                            <button onClick={() => console.log(99)}>add buttons</button>
                                            {/* <button >add buttons</button> */}
                                        </div>
                                    </div>

                                </div>
                            </div>}
                        </li>
                        <li className='admin-about__card'>
                            <div className='admin-about__card-header'>
                                <div className='admin-about__card-title'>
                                    <h3>Title:</h3>
                                    <p>{'block.title'}</p>
                                </div>
                                <div className='admin-about__card-text'>
                                    <h3>Text (first two lines):</h3>
                                    <p>{'block.text'}</p>
                                </div>
                                <div className='admin-about__card-del'>
                                    {/* <button onClick={() => deleteBlock(aboutPage, block.id)}>X</button> */}
                                    <button onClick={() => console.log(99)}>X</button>
                                </div>
                                <div className='admin-about__card-button'>
                                    <button onClick={changeStyle} className={'about-arrow'}></button>
                                    {/* <button onClick={changeStyle} className={arrowStyle}></button> */}
                                </div>
                            </div>
                            {false && <div className='about-edit__card-body'>
                                <div className='about-edit__body-title'>
                                    <AdminTextInput inputTitle={'Title'} inputText={'block.title'} />
                                </div>
                                <div className='about-edit__body-text'>
                                    <AdminTextInput inputTitle={'Text'} inputText={'block.text'} />
                                </div>

                                <div className='about-edit__body-battons'>
                                    <h3>Buttons:</h3>
                                    <div className='about-edit__battons-wrapper'>
                                        <ul className='about-edit__body-btns'>
                                            {/* {blockCardButtons || <li>No buttons added</li>} */}
                                            <li>No buttons added</li>
                                        </ul>
                                        <div className='about-edit__btn-add'>
                                            <button onClick={() => console.log(99)}>add buttons</button>
                                            {/* <button >add buttons</button> */}
                                        </div>
                                    </div>

                                </div>
                            </div>}
                        </li>
                        <li className='admin-about__card'>
                            <div className='admin-about__card-header'>
                                <div className='admin-about__card-title'>
                                    <h3>Title:</h3>
                                    <p>{'block.title'}</p>
                                </div>
                                <div className='admin-about__card-text'>
                                    <h3>Text (first two lines):</h3>
                                    <p>{'block.text'}</p>
                                </div>
                                <div className='admin-about__card-del'>
                                    {/* <button onClick={() => deleteBlock(aboutPage, block.id)}>X</button> */}
                                    <button onClick={() => console.log(99)}>X</button>
                                </div>
                                <div className='admin-about__card-button'>
                                    <button onClick={changeStyle} className={'about-arrow'}></button>
                                    {/* <button onClick={changeStyle} className={arrowStyle}></button> */}
                                </div>
                            </div>
                            {false && <div className='about-edit__card-body'>
                                <div className='about-edit__body-title'>
                                    <AdminTextInput inputTitle={'Title'} inputText={'block.title'} />
                                </div>
                                <div className='about-edit__body-text'>
                                    <AdminTextInput inputTitle={'Text'} inputText={'block.text'} />
                                </div>

                                <div className='about-edit__body-battons'>
                                    <h3>Buttons:</h3>
                                    <div className='about-edit__battons-wrapper'>
                                        <ul className='about-edit__body-btns'>
                                            {/* {blockCardButtons || <li>No buttons added</li>} */}
                                            <li>No buttons added</li>
                                        </ul>
                                        <div className='about-edit__btn-add'>
                                            <button onClick={() => console.log(99)}>add buttons</button>
                                            {/* <button >add buttons</button> */}
                                        </div>
                                    </div>

                                </div>
                            </div>}
                        </li>

                    </ul>

                </div>
            </div>

        </div>
    );
};

export default CommonCard;