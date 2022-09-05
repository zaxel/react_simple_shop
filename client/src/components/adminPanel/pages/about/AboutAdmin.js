import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import AdminTextInput from '../../commonComponents/AdminTextInput';
import AdminTextArea from '../../commonComponents/AdminTextArea';
import { Context } from '../../../..';
import { fetchPage, changeData } from '../../../../utils/staticPages/aboutPage';
import Card from './Card';
import { isContainBtns } from '../../../../utils/check/isContainBtns';
import { Spinner } from 'react-bootstrap';

const AboutAdmin = observer(() => {
    const { aboutPage } = useContext(Context);
    let title = aboutPage.pageTitle.length && aboutPage.pageTitle[0];
    const text = aboutPage.pageText.length && aboutPage.pageText[0];

    const changeInputDataCarry = changeData.bind(this, aboutPage.pageId, 'title')
    const changeAreaDataCarry = changeData.bind(this, aboutPage.pageId, 'text')

    const cards = aboutPage.pageCards.slice().sort((a,b)=>a.id-b.id).map(card=>isContainBtns(aboutPage, card.button_id) && <Card key={card.id} {...card} />);

    useEffect(() => {
        fetchPage(aboutPage);
    }, [])

    if (aboutPage.loading) {
        return (
            <div className="spinner">
                <Spinner animation="border" />
            </div>
        )
    }
    return (
        <div className='admin-pages__page admin-app'>
            <div className='admin-app__container admin-pages__container'>
                <h2>Edit content of "{aboutPage.pageName} Page".</h2>
                <h2>(Click on content to edit.)</h2>
                <AdminTextInput inputTitle={'page title'} inputText={title} cb={changeInputDataCarry}/>
                {/* <AdminTextInput inputTitle={'page title'} inputText={title} cb={setInputDataCarry} /> */}
                <AdminTextArea areaTitle={'page description'} areaText={text} cb={changeAreaDataCarry}/>
                {/* <AdminTextArea areaTitle={'page description'} areaText={text} cb={setAreaDataCarry} /> */}
                <div className='admin-app__cards-cont'>
                    <h2>edit cards: </h2>
                    <div className='admin-app__cards'>
                        {cards}
                    </div>

                </div>
            </div>
        </div>
    );
});

export default AboutAdmin;