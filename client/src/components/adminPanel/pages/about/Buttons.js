import React, { useContext, useEffect } from 'react';
import AdminTextInput from '../../commonComponents/AdminTextInput';
import { Spinner } from 'react-bootstrap';

const Buttons = () => {


    // if (aboutPage.loading) {
    //     return (
    //         <div className="spinner">
    //             <Spinner animation="border" />
    //         </div>
    //     )
    // }
    return (

        <div className='admin-pages__page about-buttons'>
            <div className='admin-pages__container about-buttons__container'>
                <h2>Edit buttons on About Page".</h2>
                <div className='about-buttons__btns-block'>
                    <h4>edit existed buttons:</h4>
                    <div className='about-buttons__btns'>
                        <div className='about-buttons__title'>
                            <AdminTextInput inputTitle={''} inputText={'contact us'} />
                        </div>
                        <div className='about-buttons__link'>
                            <AdminTextInput inputTitle={'link'} inputText={'/about'} />
                        </div>
                        <button className='about-buttons__delete'>X</button>
                    </div>
                    <div className='about-buttons__btns'>
                        <div className='about-buttons__title'>
                            <AdminTextInput inputTitle={''} inputText={'make your decision random text'} />
                        </div>
                        <div className='about-buttons__link'>
                            <AdminTextInput inputTitle={'link'} inputText={'/home/page18'} />
                        </div>
                        <button className='about-buttons__delete'>X</button>
                    </div>
                    <div className='about-buttons__btns'>
                        <div className='about-buttons__title'>
                            <AdminTextInput inputTitle={''} inputText={'home'} />
                        </div>
                        <div className='about-buttons__link'>
                            <AdminTextInput inputTitle={'link'} inputText={'/'} />
                        </div>
                        <button className='about-buttons__delete'>X</button>
                    </div>
                    <div className='about-buttons__btns'>
                        <div className='about-buttons__title'>
                            <AdminTextInput inputTitle={''} inputText={'visit our shop'} />
                        </div>
                        <div className='about-buttons__link'>
                            <AdminTextInput inputTitle={'link'} inputText={'https://www.google.com'} />
                        </div>
                        <button className='about-buttons__delete'>X</button>
                    </div>
                    <div className='about-buttons__btns'>
                        <div className='about-buttons__title'>
                            <AdminTextInput inputTitle={''} inputText={'google'} />
                        </div>
                        <div className='about-buttons__link'>
                            <AdminTextInput inputTitle={'link'} inputText={'google.com'} />
                        </div>
                        <button className='about-buttons__delete'>X</button>
                    </div>
                    <div className='about-buttons__add-btns'>
                        <h4>create new button:</h4>
                        <div className='about-buttons__btns'>
                            <div className='about-buttons__title'>
                                <input type={'text'} placeholder='button text' />
                            </div>
                            <div className='about-buttons__link'>
                                <input type={'text'} placeholder='button link' />
                            </div>
                            <button className='about-buttons__new'>add new button</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Buttons;