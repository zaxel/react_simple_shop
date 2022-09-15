import { observer } from 'mobx-react-lite';
import React, { useContext, useState, useEffect } from 'react';

import { Context } from '../../../..';
import { isContainBtns } from '../../../../utils/check/isContainBtns';
import { blockImgsLinks } from '../../../../utils/dataFormat/blockImgsLinks';
import { changeAboutBlockData } from '../../../../utils/staticPages/aboutPage';


const DraggableBlock = observer(({ id, title, text, button_id, hero }) => {

    const { aboutPage } = useContext(Context);

    const [arrowStyle, setArrowStyle] = useState('about-arrow');
    const [displayDescr, setDisplayDescr] = useState(false);

    
    
    useEffect(() => {
        if (aboutPage.activeBlockEdit === id) {
            setArrowStyle('about-arrowDown');
            setDisplayDescr(true);
        } else {
            setArrowStyle('about-arrow');
            setDisplayDescr(false);
        }
    }, [aboutPage.activeBlockEdit])

    const changeStyle = () => {
        aboutPage.activeBlockEdit === id ? aboutPage.setActiveBlockEdit(null) : aboutPage.setActiveBlockEdit(id);
    }

    const btns = isContainBtns(aboutPage, button_id) && button_id.map(btn => <li key={aboutPage.buttons[btn].id} className='admin-about__body-btn'><span>{aboutPage.buttons[btn].text}</span></li>)

    const deleteBlock = async() => {
        try{
            aboutPage.setLoading(true);
            await changeAboutBlockData(id, 'infoAboutCardId', null)
            aboutPage.removeEditBlockCardId(id); 
        }catch(e){
            console.log(e)
        }finally{
            aboutPage.setLoading(false);
        }
        
    }

    return (
        <li className='admin-about__card'>
            <div className='admin-about__card-header'>
                <div className='admin-about__card-title'>
                    <h3>Title:</h3>
                    <p>{title}</p>
                </div>
                <div className='admin-about__card-text'>
                    <h3>Text (first two lines):</h3>
                    <p>{text}</p>
                </div>
                <div className='admin-about__card-del'>
                    <button onClick={deleteBlock}>X</button>
                    {/* <button onClick={() => console.log(99)}>X</button> */}
                </div>
                <div className='admin-about__card-button'>
                    <button onClick={changeStyle} className={arrowStyle}></button>
                    {/* <button onClick={changeStyle} className={arrowStyle}></button> */}
                </div>
            </div>
            {displayDescr && <div className='admin-about__card-body'>
                <h3 className='admin-about__body-title'>
                    {title}
                </h3>
                <p className='admin-about__body-text'>
                    {text}
                </p>
                {hero && <div className='admin-about__body-img'>
                    <img alt='hero' src={process.env.REACT_APP_API_URL + blockImgsLinks(hero).hero} />
                </div>}
                <div className='admin-about__body-battons'>
                    <ul className='admin-about__body-btns'>
                        {btns}
                    </ul>
                </div>
            </div>}
        </li>

    )
});

export default DraggableBlock;