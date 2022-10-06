import React, { useContext, useEffect } from 'react';
import { Context } from '../../../..';
import { observer } from 'mobx-react-lite';
import AdminTextInput from '../../commonComponents/AdminTextInput';
import AdminImage from '../../commonComponents/AdminImage';
import { fetchPage } from '../../../../utils/staticPages/helpPage';


const HelpAdmin = observer(() => {
    const { helpAdmin } = useContext(Context);

    useEffect(() => {
        fetchPage(helpAdmin);
    }, [])

    // if (types.loading) {
    //     return (
    //         <div className="spinner">
    //             <Spinner animation="border" />
    //         </div>
    //     )
    // }
    return (
        <div className='admin-pages__help admin-pages__page'>
            <div className='admin-app__container admin-pages__container'>
                <h2>Edit content of "{helpAdmin.pageName} Page".</h2>
                <h2>(Click on content to edit.)</h2>
                <AdminTextInput inputTitle={'page title'} inputText={'title'} cb={console.log(77)} />
                <AdminImage index={0} inputTitle={'main banner:'} cb={console.log(99)} alt={'hero'} inputData={'mt0dgHmLJMVQhvjpNXDyA83vA_PxH23Y21.jpg'} />

                <div className='help-admin__contact'>
                    <h3>edit "Get In Touch" component:</h3>
                    <div className='help-admin__contact-cont'>
                        <AdminTextInput inputTitle={'component title'} inputText={'title'} cb={console.log(77)} />
                        <div className='help-admin__contact-bg'>
                            <div className='help-admin__bg-large'>
                                {/* <AdminImage id={block.id} index={0} inputTitle={'main hero'} inputData={blockImgsLinks(block.hero).hero} cb={changeAboutBlockImg} alt={'hero'} /> */}
                                <AdminImage index={0} inputTitle={'large bg image:'} cb={console.log(99)} alt={'hero'} inputData={'mt0dgHmLJMVQhvjpNXDyA83vA_PxH23Y21.jpg'} />
                            </div>
                            <div className='help-admin__bg-small'>
                                {/* <AdminImage id={block.id} index={1} inputTitle={'small screen hero'} inputData={blockImgsLinks(block.hero).smallHero} cb={changeAboutBlockImg} alt={'hero'} /> */}
                                <AdminImage index={1} inputTitle={'small bg image:'} cb={console.log(88)} alt={'hero'} inputData={'mt0dgHmLJMVQhvjpNXDyA83vA_PxH23Y21.jpg'} />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
});

export default HelpAdmin;