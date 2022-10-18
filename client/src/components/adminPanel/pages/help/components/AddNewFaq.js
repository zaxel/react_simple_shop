import React, { useContext, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import { Context } from '../../../../..';
import { createNewFaq } from '../../../../../utils/staticPages/helpPage';

const AddNewFaq = () => {
    const {helpAdmin} = useContext(Context);
    const wysiwygRef = useRef(null);

    const [question, setQuestion] = useState('');
    const [answerTitle, setAnswerTitle] = useState('');
    const [answerText, setAnswerText] = useState('');
    
    const resetNewFaqForm = () => {
        setQuestion('');
        setAnswerTitle('');
        setAnswerText('');
    }

    const onFormConfirm = async(e) => {
        e.preventDefault();
        
        if(!question){
            alert('you have to add your question');
            return;
        }
        if(!answerTitle){
            alert('you have to add answer title');
            return;
        }
        if(!answerText){
            alert('you have to add answer text');
            return;
        }
        await createNewFaq(helpAdmin, question, answerTitle, answerText);
        resetNewFaqForm();
    }

    return (
        <div className='about-blocks__add-btns'>
            <form className='about-blocks__form blocks-form'>
                <div className='blocks-form__title'>
                    <h5>question:</h5>
                    <input type={'text'} placeholder='FAQ question' value={question} onChange={(e)=>setQuestion(e.currentTarget.value)}/>
                </div>
                <div className='blocks-form__title'>
                    <h5>answer title:</h5>
                    <input type={'text'} placeholder='FAQ answer title' value={answerTitle} onChange={(e)=>setAnswerTitle(e.currentTarget.value)}/>
                </div>
                <div className='blocks-form__text'>
                    <h5>answer description:</h5>
                    <ReactQuill theme="snow" ref={wysiwygRef} autoFocus value={answerText} onChange={setAnswerText}/>
                    {/* <AdminWysiwyg areaTitle={'Answer Text'} areaText={answer?.text || 'no answer body added yet'} cb={changeAnswerTextCarried} /> */}
                    {/* <textarea placeholder='FAQ answer body' value={answerText} onChange={(e)=>setAnswerText(e.currentTarget.value)}/> */}
                </div>
                <button className='block-form__new-block' onClick={onFormConfirm}>add new FAQ</button>
            </form>
        </div>
    );
};

export default AddNewFaq;