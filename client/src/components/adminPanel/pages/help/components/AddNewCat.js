import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../../../..';
import { correctImgTypeCheck, formDataCatImg, setImageFromBlob } from '../../../../../utils/formsServing/imgServing';
import { createNewFaq } from '../../../../../utils/staticPages/helpPage';

const AddNewCat = () => {
    const {helpAdmin} = useContext(Context);


    const [title, setTitle] = useState('');
    const [link, setLink] = useState('');
    const [bannerInput, setBannerInput] = useState('');
    const [bannerSrc, setBannerSrc] = useState('')
    const [iconInput, setIconInput] = useState('');
    const [iconSrc, setIconSrc] = useState('')
    
    const onBannerChange = async(e) => {
        setBannerInput(() => e.target.files[0])
    }
    const onIconChange = async(e) => {
        setIconInput(() => e.target.files[0])
    }
    useEffect(()=>{
        bannerInput && setImageFromBlob(setBannerSrc, bannerInput);
    }, [bannerInput])

    useEffect(()=>{
        iconInput && setImageFromBlob(setIconSrc, iconInput);
    }, [iconInput])

    const resetNewCatForm = () => {
        setTitle('');
        setLink('');
        setBannerInput('');
        setBannerSrc('');
        setIconInput('');
        setIconSrc('');
    }

    const onFormConfirm = async(e) => {
        e.preventDefault();
        if (bannerInput && !correctImgTypeCheck(bannerInput)) return;
        if (iconInput && !correctImgTypeCheck(iconInput)) return;
        if(!title){
            alert('you have to add category name!');
            return;
        }
        if(!link){
            alert('you have to add category link!');
            return;
        }
        
        const formData = formDataCatImg({title, link, banner: bannerInput, icon: iconInput});
        // await createCategory(helpAdmin, formData);
        resetNewCatForm();
    }

    return (
        <div className='about-blocks__add-btns'>
            <form className='about-blocks__form blocks-form'>
                <div className='blocks-form__title'>
                    <h5>new title:</h5>
                    <input type={'text'} placeholder='category title' value={title} onChange={(e)=>setTitle(e.currentTarget.value)}/>
                </div>
                <div className='blocks-form__title'>
                    <h5>new link:</h5>
                    <input type={'text'} placeholder='/help/...your_link.../' value={link} onChange={(e)=>setLink(e.currentTarget.value)}/>
                </div>
                <div className='blocks-form__imgs-cont'>
                    <h3>Add images</h3>
                    <div className='block-form__img-cards'>
                        <div className='block-form__img-card'>
                            <h4>category banner:</h4>
                            <div className='block-form__img-wrapper'>
                                <div className='block-form__img' >
                                    {bannerSrc && <img src={bannerSrc} alt={'banner'} />}
                                </div>
                                <div className='block-form__img-edit'>
                                    <input type='file' accept="image/*" onChange={onBannerChange} />
                                </div>
                            </div>
                        </div>
                        <div className='block-form__img-card'>
                            <h4>category icon:</h4>
                            <div className='block-form__img-wrapper'>
                                <div className='block-form__img' >
                                    {iconSrc && <img src={iconSrc} alt={'icon'} />}
                                </div>
                                <div className='block-form__img-edit'>
                                    <input type='file' accept="image/*" onChange={onIconChange}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button className='block-form__new-block' onClick={onFormConfirm}>add new category</button>
            </form>
        </div>
    );
};

export default AddNewCat;