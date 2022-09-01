import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import AdminTextInput from '../../commonComponents/AdminTextInput';
import AdminTextArea from '../../commonComponents/AdminTextArea';
import { Context } from '../../../..';
import { fetchPage, setData } from '../../../../utils/staticPages/appPage';
import Card from './Card';
import { Spinner } from 'react-bootstrap';

const AboutAdmin = observer(() => {
    const { appPage } = useContext(Context);
    const appCards = appPage.pageCards.slice().sort((a,b)=>a.id-b.id).map(card => {
        return <Card {...card} key={card.id} />
    });

    const setInputDataCarry = setData.bind(this, appPage.pageId, 'title')
    const setAreaDataCarry = setData.bind(this, appPage.pageId, 'text')

    useEffect(() => {
        fetchPage(appPage);
    }, [])

    if (appPage.loading) {
        return (
            <div className="spinner">
                <Spinner animation="border" />
            </div>
        )
    }
    return (
        <div className='admin-pages__app admin-pages__page admin-app'>
            <div className='admin-app__container admin-pages__container'>
                <h2>Edit content of "{appPage.pageName} Page".</h2>
                <h2>(Click on content to edit.)</h2>
                <AdminTextInput inputTitle={'page title'} inputText={appPage.pageTitle.length ? appPage.pageTitle[0] : null} cb={setInputDataCarry} />
                <AdminTextArea areaTitle={'page description'} areaText={appPage.pageText.length ? appPage.pageText[0] : null} cb={setAreaDataCarry} />
                <div className='admin-app__cards-cont'>
                    <h2>edit cards: </h2>
                    <div className='admin-app__cards'>
                        {appCards}
                    </div>

                </div>
            </div>
        </div>
    );
});

export default AboutAdmin;