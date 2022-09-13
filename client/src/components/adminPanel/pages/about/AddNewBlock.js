import React, { useEffect, useState } from 'react';
import { setImageFromBlob } from '../../../../utils/formsServing/imgServing';

const AddNewBlock = () => {

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

    

    return (
        <div className='about-blocks__add-btns'>
            <form className='about-blocks__form blocks-form'>
                <div className='blocks-form__title'>
                    {/* <input type={'text'} placeholder='button text' value={newBtnText} onChange={(e)=>setNewBtnText(e.currentTarget.value)}/> */}
                    <h5>new title:</h5>
                    <input type={'text'} placeholder='block title' />
                </div>
                <div className='blocks-form__text'>
                    {/* <input type={'text'} placeholder='button link' value={newBtnLink} onChange={(e)=>setNewBtnLink(e.target.value)}/> */}
                    <h5>new description:</h5>
                    <textarea placeholder='block description' />
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
                <button className='block-form__new-block' onClick={()=>console.log('add')}>add new block</button>
            </form>
        </div>
    );
};

export default AddNewBlock;