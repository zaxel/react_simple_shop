import React, { useState, useContext, useEffect } from 'react';
import AdminImage from '../../commonComponents/AdminImage';
import { Spinner } from 'react-bootstrap';
import AdminTextInput from '../../commonComponents/AdminTextInput';
import hero from '../../../../assets/about/exp_hero_1.jpg';
import heroSmall from '../../../../assets/about/exp_hero_3.jpg';


const Blocks = () => {
    const [newBlockLoading, setNewBlockLoading] = useState(false);
    const [arrowStyle, setArrowStyle] = useState('arrow');
    const [displayDescr, setDisplayDescr] = useState(false);

    const changeStyle = () => {
        setDisplayDescr(() => !displayDescr);
        arrowStyle === 'arrow' ? setArrowStyle('arrowDown') : setArrowStyle('arrow');
    }

    // if (aboutPage.loading) {
    //     return (
    //         <div className="spinner">
    //             <Spinner animation="border" />
    //         </div>
    //     )
    // }
    return (
        <div className='admin-pages__page about-blocks'>
            <div className='admin-pages__container about-blocks__container'>
                <h2>Edit blocks of About Page".</h2>
                <div className='about-blocks__blocks'>
                    <h4>edit existing blocks:</h4>
                    <ul className='about-blocks__cards-cont'>
                        <li className='about-blocks__card'>
                            <div className='about-blocks__card-header'>
                                <div className='about-blocks__card-title'>
                                    <h3>Title:</h3>
                                    <p>Brands you'll only find at ARAZONE</p>
                                </div>
                                <div className='about-blocks__card-text'>
                                    <h3>Text (first two lines):</h3>
                                    <p>Giving you the confidence to express your individuality, ARAZONE DESIGN interprets major trends, adding that next-level ARAZONE spin. Representing in our size ranges (ARAZONE Curve, Tall, Petite and Maternity), we've got all the stuff you need to invent a style that’s all yours… making every day, night and everything in-between as extraordinary as you are.</p>
                                </div>
                                <div className='about-blocks__card-button'>
                                    <button onClick={changeStyle} className={arrowStyle}></button>
                                </div>
                            </div>
                            {displayDescr && <div className='about-blocks__card-body'>
                                <div className='about-blocks__body-title'>
                                    <AdminTextInput inputTitle={'Title'} inputText={'Body positivity'} />
                                </div>
                                <div className='about-blocks__body-text'>
                                    <AdminTextInput inputTitle={'Text'} inputText={'It’s important for us to promote a healthy body image – we’re not about conforming to any stereotypes'} />
                                </div>
                                <div className='about-blocks__body-imgs'>
                                    <h3>Edit images:</h3>
                                    <div className='about-blocks__body-images'>
                                        <div className='about-blocks__body-image'>
                                            {/* <AdminImage id={id} inputTitle={''} imgDbCollName={'app_button_img'} inputData={app_button_img} cb={changeAppCardImg} alt={'button'} /> */}
                                            <AdminImage id={11} inputTitle={'main hero'} inputData={'855e8008-3a98-41fb-8e87-bef28caf10ab.jpg'} imgDbCollName={'app_button_img'} alt={'hero'} />
                                        </div>
                                        <div className='about-blocks__body-image'>
                                            {/* <AdminImage id={id} inputTitle={''} imgDbCollName={'app_button_img'} inputData={app_button_img} cb={changeAppCardImg} alt={'button'} /> */}
                                            <AdminImage id={12} inputTitle={'small screen hero'} inputData={'630dad37-d180-4369-a038-26bd0ed6c07d.jpg'} imgDbCollName={'app_button_img'} alt={'hero'} />
                                        </div>
                                    </div>
                                </div>
                                <div className='about-blocks__body-battons'>
                                    <h3>Buttons:</h3>
                                    <ul className='about-blocks__body-btns'>
                                        <li className='about-blocks__body-btn'>
                                            <button>more about us</button>
                                        </li>
                                        <li className='about-blocks__body-btn'>
                                            <button>shop women</button>
                                        </li>
                                        <li className='about-blocks__body-btn'>
                                            <button>shop women</button>
                                        </li>
                                        <li className='about-blocks__body-btn'>
                                            <button>sh</button>
                                        </li>
                                        <li className='about-blocks__body-btn'>
                                            <button>shop</button>
                                        </li>
                                        <li className='about-blocks__body-btn'>
                                            <button>shop women</button>
                                        </li>
                                        <li className='about-blocks__body-btn'>
                                            <button>shop women</button>
                                        </li>
                                        <li className='about-blocks__body-btn'>
                                            <button>shop women</button>
                                        </li>
                                    </ul>
                                </div>
                            </div>}
                        </li>
                        <li className='about-blocks__card'>
                            <div className='about-blocks__card-header'>
                                <div className='about-blocks__card-title'>
                                    <h3>Title:</h3>
                                    <p>Brands you'll only find at ARAZONE</p>
                                </div>
                                <div className='about-blocks__card-text'>
                                    <h3>Text (first two lines):</h3>
                                    <p>Giving you the confidence to express your individuality, ARAZONE DESIGN interprets major trends, adding that next-level ARAZONE spin. Representing in our size ranges (ARAZONE Curve, Tall, Petite and Maternity), we've got all the stuff you need to invent a style that’s all yours… making every day, night and everything in-between as extraordinary as you are.</p>
                                </div>
                                <div className='about-blocks__card-button'>
                                    <button onClick={changeStyle} className={arrowStyle}></button>
                                </div>
                            </div>
                            {displayDescr && <div className='about-blocks__card-body'>
                                <div className='about-blocks__body-title'>
                                    <AdminTextInput inputTitle={'Title'} inputText={'Body positivity'} />
                                </div>
                                <div className='about-blocks__body-text'>
                                    <AdminTextInput inputTitle={'Text'} inputText={'It’s important for us to promote a healthy body image – we’re not about conforming to any stereotypes'} />
                                </div>
                                <div className='about-blocks__body-imgs'>
                                    <h3>Edit images:</h3>
                                    <div className='about-blocks__body-images'>
                                        <div className='about-blocks__body-image'>
                                            {/* <AdminImage id={id} inputTitle={''} imgDbCollName={'app_button_img'} inputData={app_button_img} cb={changeAppCardImg} alt={'button'} /> */}
                                            <AdminImage id={11} inputTitle={'main hero'} inputData={'855e8008-3a98-41fb-8e87-bef28caf10ab.jpg'} imgDbCollName={'app_button_img'} alt={'hero'} />
                                        </div>
                                        <div className='about-blocks__body-image'>
                                            {/* <AdminImage id={id} inputTitle={''} imgDbCollName={'app_button_img'} inputData={app_button_img} cb={changeAppCardImg} alt={'button'} /> */}
                                            <AdminImage id={12} inputTitle={'small screen hero'} inputData={'630dad37-d180-4369-a038-26bd0ed6c07d.jpg'} imgDbCollName={'app_button_img'} alt={'hero'} />
                                        </div>
                                    </div>
                                </div>
                                <div className='about-blocks__body-battons'>
                                    <h3>Buttons:</h3>
                                    <ul className='about-blocks__body-btns'>
                                        <li className='about-blocks__body-btn'>
                                            <button>more about us</button>
                                        </li>
                                        <li className='about-blocks__body-btn'>
                                            <button>shop women</button>
                                        </li>
                                        <li className='about-blocks__body-btn'>
                                            <button>shop women</button>
                                        </li>
                                        <li className='about-blocks__body-btn'>
                                            <button>sh</button>
                                        </li>
                                        <li className='about-blocks__body-btn'>
                                            <button>shop</button>
                                        </li>
                                        <li className='about-blocks__body-btn'>
                                            <button>shop women</button>
                                        </li>
                                        <li className='about-blocks__body-btn'>
                                            <button>shop women</button>
                                        </li>
                                        <li className='about-blocks__body-btn'>
                                            <button>shop women</button>
                                        </li>
                                    </ul>
                                </div>
                            </div>}
                        </li>
                        <li className='about-blocks__card'>
                            <div className='about-blocks__card-header'>
                                <div className='about-blocks__card-title'>
                                    <h3>Title:</h3>
                                    <p>Brands you'll only find at ARAZONE</p>
                                </div>
                                <div className='about-blocks__card-text'>
                                    <h3>Text (first two lines):</h3>
                                    <p>Giving you the confidence to express your individuality, ARAZONE DESIGN interprets major trends, adding that next-level ARAZONE spin. Representing in our size ranges (ARAZONE Curve, Tall, Petite and Maternity), we've got all the stuff you need to invent a style that’s all yours… making every day, night and everything in-between as extraordinary as you are.</p>
                                </div>
                                <div className='about-blocks__card-button'>
                                    <button onClick={changeStyle} className={arrowStyle}></button>
                                </div>
                            </div>
                            {displayDescr && <div className='about-blocks__card-body'>
                                <div className='about-blocks__body-title'>
                                    <AdminTextInput inputTitle={'Title'} inputText={'Body positivity'} />
                                </div>
                                <div className='about-blocks__body-text'>
                                    <AdminTextInput inputTitle={'Text'} inputText={'It’s important for us to promote a healthy body image – we’re not about conforming to any stereotypes'} />
                                </div>
                                <div className='about-blocks__body-imgs'>
                                    <h3>Edit images:</h3>
                                    <div className='about-blocks__body-images'>
                                        <div className='about-blocks__body-image'>
                                            {/* <AdminImage id={id} inputTitle={''} imgDbCollName={'app_button_img'} inputData={app_button_img} cb={changeAppCardImg} alt={'button'} /> */}
                                            <AdminImage id={11} inputTitle={'main hero'} inputData={'855e8008-3a98-41fb-8e87-bef28caf10ab.jpg'} imgDbCollName={'app_button_img'} alt={'hero'} />
                                        </div>
                                        <div className='about-blocks__body-image'>
                                            {/* <AdminImage id={id} inputTitle={''} imgDbCollName={'app_button_img'} inputData={app_button_img} cb={changeAppCardImg} alt={'button'} /> */}
                                            <AdminImage id={12} inputTitle={'small screen hero'} inputData={'630dad37-d180-4369-a038-26bd0ed6c07d.jpg'} imgDbCollName={'app_button_img'} alt={'hero'} />
                                        </div>
                                    </div>
                                </div>
                                <div className='about-blocks__body-battons'>
                                    <h3>Buttons:</h3>
                                    <ul className='about-blocks__body-btns'>
                                        <li className='about-blocks__body-btn'>
                                            <button>more about us</button>
                                        </li>
                                        <li className='about-blocks__body-btn'>
                                            <button>shop women</button>
                                        </li>
                                        <li className='about-blocks__body-btn'>
                                            <button>shop women</button>
                                        </li>
                                        <li className='about-blocks__body-btn'>
                                            <button>sh</button>
                                        </li>
                                        <li className='about-blocks__body-btn'>
                                            <button>shop</button>
                                        </li>
                                        <li className='about-blocks__body-btn'>
                                            <button>shop women</button>
                                        </li>
                                        <li className='about-blocks__body-btn'>
                                            <button>shop women</button>
                                        </li>
                                        <li className='about-blocks__body-btn'>
                                            <button>shop women</button>
                                        </li>
                                    </ul>
                                </div>
                            </div>}
                        </li>
                        <li className='about-blocks__card'>
                            <div className='about-blocks__card-header'>
                                <div className='about-blocks__card-title'>
                                    <h3>Title:</h3>
                                    <p>Brands you'll only find at ARAZONE</p>
                                </div>
                                <div className='about-blocks__card-text'>
                                    <h3>Text (first two lines):</h3>
                                    <p>Giving you the confidence to express your individuality, ARAZONE DESIGN interprets major trends, adding that next-level ARAZONE spin. Representing in our size ranges (ARAZONE Curve, Tall, Petite and Maternity), we've got all the stuff you need to invent a style that’s all yours… making every day, night and everything in-between as extraordinary as you are.</p>
                                </div>
                                <div className='about-blocks__card-button'>
                                    <button onClick={changeStyle} className={arrowStyle}></button>
                                </div>
                            </div>
                            {displayDescr && <div className='about-blocks__card-body'>
                                <div className='about-blocks__body-title'>
                                    <AdminTextInput inputTitle={'Title'} inputText={'Body positivity'} />
                                </div>
                                <div className='about-blocks__body-text'>
                                    <AdminTextInput inputTitle={'Text'} inputText={'It’s important for us to promote a healthy body image – we’re not about conforming to any stereotypes'} />
                                </div>
                                <div className='about-blocks__body-imgs'>
                                    <h3>Edit images:</h3>
                                    <div className='about-blocks__body-images'>
                                        <div className='about-blocks__body-image'>
                                            {/* <AdminImage id={id} inputTitle={''} imgDbCollName={'app_button_img'} inputData={app_button_img} cb={changeAppCardImg} alt={'button'} /> */}
                                            <AdminImage id={11} inputTitle={'main hero'} inputData={'855e8008-3a98-41fb-8e87-bef28caf10ab.jpg'} imgDbCollName={'app_button_img'} alt={'hero'} />
                                        </div>
                                        <div className='about-blocks__body-image'>
                                            {/* <AdminImage id={id} inputTitle={''} imgDbCollName={'app_button_img'} inputData={app_button_img} cb={changeAppCardImg} alt={'button'} /> */}
                                            <AdminImage id={12} inputTitle={'small screen hero'} inputData={'630dad37-d180-4369-a038-26bd0ed6c07d.jpg'} imgDbCollName={'app_button_img'} alt={'hero'} />
                                        </div>
                                    </div>
                                </div>
                                <div className='about-blocks__body-battons'>
                                    <h3>Buttons:</h3>
                                    <ul className='about-blocks__body-btns'>
                                        <li className='about-blocks__body-btn'>
                                            <button>more about us</button>
                                        </li>
                                        <li className='about-blocks__body-btn'>
                                            <button>shop women</button>
                                        </li>
                                        <li className='about-blocks__body-btn'>
                                            <button>shop women</button>
                                        </li>
                                        <li className='about-blocks__body-btn'>
                                            <button>sh</button>
                                        </li>
                                        <li className='about-blocks__body-btn'>
                                            <button>shop</button>
                                        </li>
                                        <li className='about-blocks__body-btn'>
                                            <button>shop women</button>
                                        </li>
                                        <li className='about-blocks__body-btn'>
                                            <button>shop women</button>
                                        </li>
                                        <li className='about-blocks__body-btn'>
                                            <button>shop women</button>
                                        </li>
                                    </ul>
                                </div>
                            </div>}
                        </li>
                        <li className='about-blocks__card'>
                            <div className='about-blocks__card-header'>
                                <div className='about-blocks__card-title'>
                                    <h3>Title:</h3>
                                    <p>Brands you'll only find at ARAZONE</p>
                                </div>
                                <div className='about-blocks__card-text'>
                                    <h3>Text (first two lines):</h3>
                                    <p>Giving you the confidence to express your individuality, ARAZONE DESIGN interprets major trends, adding that next-level ARAZONE spin. Representing in our size ranges (ARAZONE Curve, Tall, Petite and Maternity), we've got all the stuff you need to invent a style that’s all yours… making every day, night and everything in-between as extraordinary as you are.</p>
                                </div>
                                <div className='about-blocks__card-button'>
                                    <button onClick={changeStyle} className={arrowStyle}></button>
                                </div>
                            </div>
                            {displayDescr && <div className='about-blocks__card-body'>
                                <div className='about-blocks__body-title'>
                                    <AdminTextInput inputTitle={'Title'} inputText={'Body positivity'} />
                                </div>
                                <div className='about-blocks__body-text'>
                                    <AdminTextInput inputTitle={'Text'} inputText={'It’s important for us to promote a healthy body image – we’re not about conforming to any stereotypes'} />
                                </div>
                                <div className='about-blocks__body-imgs'>
                                    <h3>Edit images:</h3>
                                    <div className='about-blocks__body-images'>
                                        <div className='about-blocks__body-image'>
                                            {/* <AdminImage id={id} inputTitle={''} imgDbCollName={'app_button_img'} inputData={app_button_img} cb={changeAppCardImg} alt={'button'} /> */}
                                            <AdminImage id={11} inputTitle={'main hero'} inputData={'855e8008-3a98-41fb-8e87-bef28caf10ab.jpg'} imgDbCollName={'app_button_img'} alt={'hero'} />
                                        </div>
                                        <div className='about-blocks__body-image'>
                                            {/* <AdminImage id={id} inputTitle={''} imgDbCollName={'app_button_img'} inputData={app_button_img} cb={changeAppCardImg} alt={'button'} /> */}
                                            <AdminImage id={12} inputTitle={'small screen hero'} inputData={'630dad37-d180-4369-a038-26bd0ed6c07d.jpg'} imgDbCollName={'app_button_img'} alt={'hero'} />
                                        </div>
                                    </div>
                                </div>
                                <div className='about-blocks__body-battons'>
                                    <h3>Buttons:</h3>
                                    <ul className='about-blocks__body-btns'>
                                        <li className='about-blocks__body-btn'>
                                            <button>more about us</button>
                                        </li>
                                        <li className='about-blocks__body-btn'>
                                            <button>shop women</button>
                                        </li>
                                        <li className='about-blocks__body-btn'>
                                            <button>shop women</button>
                                        </li>
                                        <li className='about-blocks__body-btn'>
                                            <button>sh</button>
                                        </li>
                                        <li className='about-blocks__body-btn'>
                                            <button>shop</button>
                                        </li>
                                        <li className='about-blocks__body-btn'>
                                            <button>shop women</button>
                                        </li>
                                        <li className='about-blocks__body-btn'>
                                            <button>shop women</button>
                                        </li>
                                        <li className='about-blocks__body-btn'>
                                            <button>shop women</button>
                                        </li>
                                    </ul>
                                </div>
                            </div>}
                        </li>
                        <li className='about-blocks__card'>
                            <div className='about-blocks__card-header'>
                                <div className='about-blocks__card-title'>
                                    <h3>Title:</h3>
                                    <p>Brands you'll only find at ARAZONE</p>
                                </div>
                                <div className='about-blocks__card-text'>
                                    <h3>Text (first two lines):</h3>
                                    <p>Giving you the confidence to express your individuality, ARAZONE DESIGN interprets major trends, adding that next-level ARAZONE spin. Representing in our size ranges (ARAZONE Curve, Tall, Petite and Maternity), we've got all the stuff you need to invent a style that’s all yours… making every day, night and everything in-between as extraordinary as you are.</p>
                                </div>
                                <div className='about-blocks__card-button'>
                                    <button onClick={changeStyle} className={arrowStyle}></button>
                                </div>
                            </div>
                            {displayDescr && <div className='about-blocks__card-body'>
                                <div className='about-blocks__body-title'>
                                    <AdminTextInput inputTitle={'Title'} inputText={'Body positivity'} />
                                </div>
                                <div className='about-blocks__body-text'>
                                    <AdminTextInput inputTitle={'Text'} inputText={'It’s important for us to promote a healthy body image – we’re not about conforming to any stereotypes'} />
                                </div>
                                <div className='about-blocks__body-imgs'>
                                    <h3>Edit images:</h3>
                                    <div className='about-blocks__body-images'>
                                        <div className='about-blocks__body-image'>
                                            {/* <AdminImage id={id} inputTitle={''} imgDbCollName={'app_button_img'} inputData={app_button_img} cb={changeAppCardImg} alt={'button'} /> */}
                                            <AdminImage id={11} inputTitle={'main hero'} inputData={'855e8008-3a98-41fb-8e87-bef28caf10ab.jpg'} imgDbCollName={'app_button_img'} alt={'hero'} />
                                        </div>
                                        <div className='about-blocks__body-image'>
                                            {/* <AdminImage id={id} inputTitle={''} imgDbCollName={'app_button_img'} inputData={app_button_img} cb={changeAppCardImg} alt={'button'} /> */}
                                            <AdminImage id={12} inputTitle={'small screen hero'} inputData={'630dad37-d180-4369-a038-26bd0ed6c07d.jpg'} imgDbCollName={'app_button_img'} alt={'hero'} />
                                        </div>
                                    </div>
                                </div>
                                <div className='about-blocks__body-battons'>
                                    <h3>Buttons:</h3>
                                    <ul className='about-blocks__body-btns'>
                                        <li className='about-blocks__body-btn'>
                                            <button>more about us</button>
                                        </li>
                                        <li className='about-blocks__body-btn'>
                                            <button>shop women</button>
                                        </li>
                                        <li className='about-blocks__body-btn'>
                                            <button>shop women</button>
                                        </li>
                                        <li className='about-blocks__body-btn'>
                                            <button>sh</button>
                                        </li>
                                        <li className='about-blocks__body-btn'>
                                            <button>shop</button>
                                        </li>
                                        <li className='about-blocks__body-btn'>
                                            <button>shop women</button>
                                        </li>
                                        <li className='about-blocks__body-btn'>
                                            <button>shop women</button>
                                        </li>
                                        <li className='about-blocks__body-btn'>
                                            <button>shop women</button>
                                        </li>
                                    </ul>
                                </div>
                            </div>}
                        </li>
                    </ul>
                    {/* {cards} */}
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
        </div>
    );
};

export default Blocks;