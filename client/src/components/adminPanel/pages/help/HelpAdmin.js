import React, { useContext, useEffect } from 'react';
import { Context } from '../../../..';
import { observer } from 'mobx-react-lite';
import AdminTextInput from '../../commonComponents/AdminTextInput';
import AdminImage from '../../commonComponents/AdminImage';
import { changeTitle, changeContactTitle, fetchPage, changePageHero } from '../../../../utils/staticPages/helpPage';
import { Spinner } from 'react-bootstrap';


const HelpAdmin = observer(() => {
    const { helpAdmin } = useContext(Context);
    const title = helpAdmin.pageTitle;
    const contactTitle = helpAdmin.contactTitle;

    const mainHero = helpAdmin.pageImg;
    const contactHeroLrg = helpAdmin.contactBgImages[0];
    const contactHeroSml = helpAdmin.contactBgImages[1];
    const pageId = helpAdmin.pageId;

    const changeTitleCarry = changeTitle.bind(this, helpAdmin.pageId, 'title', helpAdmin);
    const changeContactTitleCarry = changeContactTitle.bind(this, helpAdmin.pageId, 'title', helpAdmin);

    useEffect(() => {
        fetchPage(helpAdmin);
    }, [])

    if (helpAdmin.loading) {
        return (
            <div className="spinner">
                <Spinner animation="border" />
            </div>
        )
    }
    return (
        <div className='admin-pages__help admin-pages__page'>
            <div className='admin-app__container admin-pages__container'>
                <h2>Edit content of "{helpAdmin.pageName} Page".</h2>
                <h2>(Click on content to edit.)</h2>
                <AdminTextInput inputTitle={'page title'} inputText={title || 'no title added yet'} cb={changeTitleCarry} />
                <AdminImage id={pageId} inputTitle={'main banner:'} cb={changePageHero} alt={'hero'} inputData={mainHero} type={'mainHero'}/>
                <div className='help-admin__contact'>
                    <h3>edit "Get In Touch" component:</h3>
                    <div className='help-admin__contact-cont'>
                        <AdminTextInput inputTitle={'contact title'} inputText={contactTitle || 'no title added yet'} cb={changeContactTitleCarry} />
                        <div className='help-admin__contact-bg'>
                            <div className='help-admin__bg-large'>
                                <AdminImage id={pageId} inputTitle={'large bg image:'} cb={changePageHero} alt={'hero'} inputData={contactHeroLrg} type={'contactLargeBg'}/>
                            </div>
                            <div className='help-admin__bg-small'>
                                <AdminImage id={pageId} inputTitle={'small bg image:'} cb={changePageHero} alt={'hero'} inputData={contactHeroSml} type={'contactSmallBg'}/>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
});

export default HelpAdmin;