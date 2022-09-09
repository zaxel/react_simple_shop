import React, {useState, useContext, useEffect} from 'react';
import AdminTextInput from '../../commonComponents/AdminTextInput';
import AdminImage from '../../commonComponents/AdminImage';
import { Context } from '../../../..';
import { observer } from 'mobx-react-lite';
import { changeAboutBlockImg } from '../../../../utils/staticPages/aboutPage';
import { blockImgsLinks } from '../../../../utils/dataFormat/blockImgsLinks';

const BlockCard = observer(({block, buttons, onAddBtnsClick}) => {

    const {aboutPage} = useContext(Context);
    const [arrowStyle, setArrowStyle] = useState('arrow');
    const [displayDescr, setDisplayDescr] = useState(false);

    const changeStyle = () => {
        aboutPage.activeBlockEdit === block.id ? aboutPage.setActiveBlockEdit(null) : aboutPage.setActiveBlockEdit(block.id);
    }
    useEffect(()=>{
        if(aboutPage.activeBlockEdit === block.id){ 
            setArrowStyle('arrowDown'); 
            setDisplayDescr(true);
        }else{ 
            setArrowStyle('arrow'); 
            setDisplayDescr(false);
        }
    }, [aboutPage.activeBlockEdit])

    return (
        <li className='about-blocks__card'>
                            <div className='about-blocks__card-header'>
                                <div className='about-blocks__card-title'>
                                    <h3>Title:</h3>
                                    <p>{block.title}</p>
                                </div>
                                <div className='about-blocks__card-text'>
                                    <h3>Text (first two lines):</h3>
                                    <p>{block.text}</p>
                                </div>
                                <div className='about-blocks__card-button'>
                                    <button onClick={changeStyle} className={arrowStyle}></button>
                                </div>
                            </div>
                            {displayDescr && <div className='about-blocks__card-body'>
                                <div className='about-blocks__body-title'>
                                    <AdminTextInput inputTitle={'Title'} inputText={block.title} />
                                </div>
                                <div className='about-blocks__body-text'>
                                    <AdminTextInput inputTitle={'Text'} inputText={block.text} />
                                </div>
                                <div className='about-blocks__body-imgs'>
                                    <h3>Edit images:</h3>
                                    <div className='about-blocks__body-images'>
                                        <div className='about-blocks__body-image'>
                                            <AdminImage id={block.id} index={0} inputTitle={'main hero'} inputData={blockImgsLinks(block.hero).hero} cb={changeAboutBlockImg} alt={'hero'} />
                                        </div>
                                        <div className='about-blocks__body-image'>
                                            <AdminImage id={block.id} index={1} inputTitle={'small screen hero'} inputData={blockImgsLinks(block.hero).smallHero} cb={changeAboutBlockImg} alt={'hero'} />
                                        </div>
                                    </div>
                                </div>
                                <div className='about-blocks__body-battons'>
                                    <h3>Buttons:</h3>
                                    <div className='about-blocks__battons-wrapper'>
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
                                        <div className='about-blocks__btn-add'>
                                            <button onClick={onAddBtnsClick}>add buttons</button>
                                            {/* <button >add buttons</button> */}
                                        </div>
                                    </div>

                                </div>
                            </div>}
                        </li>
    );
});

export default BlockCard;