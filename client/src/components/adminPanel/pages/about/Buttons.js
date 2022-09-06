import React, { useContext, useEffect, useState, useRef } from 'react';
import AdminTextInput from '../../commonComponents/AdminTextInput';
import { fetchBtns, createBtn } from '../../../../utils/staticPages/aboutPage';
import { observer } from 'mobx-react-lite';
import { Context } from '../../../..';
import { Spinner } from 'react-bootstrap';
import ButtonCard from './ButtonCard';

const Buttons = observer(() => {
    const { aboutPage } = useContext(Context);
    const [localLoading, setLocalLoading] = useState(false);
    const [newBtnText, setNewBtnText] = useState('');
    const [newBtnLink, setNewBtnLink] = useState('');
    const newBtnRef = useRef(null);

    const btns = aboutPage.buttons;
    const btnsId = Object.keys(btns);
    const cards = btnsId.length && btnsId.map(id => <ButtonCard key={id} text={btns[id]['text']} link={btns[id]['link']} />);


    useEffect(() => fetchBtns(aboutPage), [])

    const addNewButton = async() => {
        try{
            setLocalLoading(true);
            await createBtn(aboutPage, newBtnText, newBtnLink);
            setNewBtnText('');
            setNewBtnLink('');
        }catch(e){
            alert(e?.response?.data?.message);
            console.log(e);
        }finally{
            setLocalLoading(false);
        }
    }

    if (aboutPage.loading) {
        return (
            <div className="spinner">
                <Spinner animation="border" />
            </div>
        )
    }
    return (

        <div className='admin-pages__page about-buttons'>
            <div className='admin-pages__container about-buttons__container'>
                <h2>Edit buttons on About Page".</h2>
                <div className='about-buttons__btns-block'>
                    <h4>edit existing buttons:</h4>
                    {cards}
                    {/* <div className='about-buttons__btns'>
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
                    </div> */}
                    {localLoading ?
                        <div className="spinner about-buttons__spinner">
                            <Spinner animation="border" />
                        </div> :
                        <div className='about-buttons__add-btns'>
                            <h4>create new button:</h4>
                            <div className='about-buttons__btns'>
                                <div className='about-buttons__title'>
                                    <input type={'text'} placeholder='button text' value={newBtnText} onChange={(e)=>setNewBtnText(e.currentTarget.value)}/>
                                </div>
                                <div className='about-buttons__link'>
                                    <input type={'text'} placeholder='button link' value={newBtnLink} onChange={(e)=>setNewBtnLink(e.target.value)}/>
                                </div>
                                <button ref={newBtnRef} onClick={addNewButton} className='about-buttons__new'>add new button</button>
                            </div>

                        </div>}
                </div>
            </div>
        </div>
    );
});

export default Buttons;