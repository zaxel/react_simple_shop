import React, { useEffect, useState, useContext } from 'react';
import { correctImgTypeCheck, formDataImg, setImageFromBlob } from '../../../../utils/formsServing/imgServing';
import { createBlock } from '../../../../utils/staticPages/aboutPage';
import { Context } from '../../../..';

const AddNewBlock = () => {
    const {aboutPage} = useContext(Context);
    const [input, setInput] = useState('');
    const [text, setText] = useState('');
    const [smallImgInput, setSmallImgInput] = useState('');
    const [smallImgSrc, setSmallImgSrc] = useState('')
    const [imgInput, setImgInput] = useState('');
    const [imgSrc, setImgSrc] = useState('')

    const onInputImageChange = async(e) => {
        setImgInput(() => e.target.files[0])
    }
    const onInputSmallImageChange = async(e) => {
        setSmallImgInput(() => e.target.files[0])
    }
    useEffect(()=>{
        smallImgInput && setImageFromBlob(setSmallImgSrc, smallImgInput);
    }, [smallImgInput])

    useEffect(()=>{
        imgInput && setImageFromBlob(setImgSrc, imgInput);
    }, [imgInput])

    const onFormConfirm = (e) => {
        e.preventDefault();
        if (imgInput && !correctImgTypeCheck(imgInput)) return;
        if (smallImgInput && !correctImgTypeCheck(smallImgInput)) return;
        if(!input){
            alert('title could not be empty');
            return;
        }
        if(!text){
            alert('description could not be empty');
            return;
        }
        const formData = formDataImg({input: imgInput, inputAlt: smallImgInput, title: input, text});
        createBlock(aboutPage, formData);
    }

    return (
        <div className='about-blocks__add-btns'>
            <form className='about-blocks__form blocks-form'>
                <div className='blocks-form__title'>
                    <h5>new title:</h5>
                    <input type={'text'} placeholder='block title' value={input} onChange={(e)=>setInput(e.currentTarget.value)}/>
                </div>
                <div className='blocks-form__text'>
                    <h5>new description:</h5>
                    <textarea placeholder='block description' value={text} onChange={(e)=>setText(e.currentTarget.value)}/>
                </div>
                <div className='blocks-form__imgs-cont'>
                    <h3>Edit images</h3>
                    <div className='block-form__img-cards'>
                        <div className='block-form__img-card'>
                            <h4>main hero:</h4>
                            <div className='block-form__img-wrapper'>
                                <div className='block-form__img' >
                                    {imgSrc && <img src={imgSrc} alt={'hero'} />}
                                </div>
                                <div className='block-form__img-edit'>
                                    <input type='file' accept="image/*" onChange={onInputImageChange} onClick={() => console.log('click')} />
                                </div>
                            </div>
                        </div>
                        <div className='block-form__img-card'>
                            <h4>small screen hero:</h4>
                            <div className='block-form__img-wrapper'>
                                <div className='block-form__img' >
                                    {smallImgSrc && <img src={smallImgSrc} alt={'small hero'} />}
                                </div>
                                <div className='block-form__img-edit'>
                                    <input type='file' accept="image/*" onChange={onInputSmallImageChange} onClick={() => console.log('click')} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button className='block-form__new-block' onClick={onFormConfirm}>add new block</button>
            </form>
        </div>
    );
};

export default AddNewBlock;