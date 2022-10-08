import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../../../..';

const AddNewFaq = () => {
    const {helpAdmin} = useContext(Context);


    const [input, setInput] = useState('');
    const [text, setText] = useState('');
    

    const onFormConfirm = (e) => {
        e.preventDefault();
        
        if(!input){
            alert('title could not be empty');
            return;
        }
        if(!text){
            alert('description could not be empty');
            return;
        }
        // const formData = formDataImg({input: imgInput, inputAlt: smallImgInput, title: input, text});
        // createBlock(aboutPage, formData);
    }

    return (
        <div className='about-blocks__add-btns'>
            <form className='about-blocks__form blocks-form'>
                <div className='blocks-form__title'>
                    <h5>question:</h5>
                    <input type={'text'} placeholder='FAQ question' value={input} onChange={(e)=>setInput(e.currentTarget.value)}/>
                </div>
                <div className='blocks-form__title'>
                    <h5>answer title:</h5>
                    <input type={'text'} placeholder='FAQ answer title' value={input} onChange={(e)=>setInput(e.currentTarget.value)}/>
                </div>
                <div className='blocks-form__text'>
                    <h5>answer description:</h5>
                    <textarea placeholder='FAQ answer body' value={text} onChange={(e)=>setText(e.currentTarget.value)}/>
                </div>
                
                <button className='block-form__new-block' onClick={onFormConfirm}>add new FAQ</button>
            </form>
        </div>
    );
};

export default AddNewFaq;