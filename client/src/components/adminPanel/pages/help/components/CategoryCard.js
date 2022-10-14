import { observer } from 'mobx-react-lite';
import React, {useContext, useState, useEffect} from 'react';
import { Context } from '../../../../..';
import CategoryCardBody from './CategoryCardBody';

const CategoryCard = observer(({id, icon, title, banner, link}) => {
    const { helpAdmin } = useContext(Context);
    const [arrowStyle, setArrowStyle] = useState('arrow');
    const [faqArrowStyle, setFaqArrowStyle] = useState('arrow');
    const [displayDescr, setDisplayDescr] = useState(false);
    const [displayFaqs, setDisplayFaqs] = useState(false);

    const changeStyle = () => {
        if(helpAdmin.activeCatEdit === id){
            helpAdmin.setActiveCatEdit(null);
        }else{
            helpAdmin.setActiveCatEdit(id);
            helpAdmin.setActiveCatBody(null);
        }
    }
    const changeFaqStyle = () => {
        if(helpAdmin.activeCatBody === id){
            helpAdmin.setActiveCatBody(null)
        }else{
            helpAdmin.setActiveCatBody(id)
            helpAdmin.setActiveCatEdit(null);
        }
    }

    useEffect(() => {
        if (helpAdmin.activeCatEdit === id) {
            setArrowStyle('arrowDown');
            setDisplayDescr(true);
            setFaqArrowStyle('arrow');
            setDisplayFaqs(false);
        }else if(helpAdmin.activeCatBody === id){
            setArrowStyle('arrow');
            setDisplayDescr(false);
            setFaqArrowStyle('arrowDown');
            setDisplayFaqs(true);
        }
         else {
            setArrowStyle('arrow');
            setFaqArrowStyle('arrow');
            setDisplayDescr(false);
            setDisplayFaqs(false);
        }
    }, [helpAdmin.activeCatEdit, helpAdmin.activeCatBody])

    const onDeleteCategoryClick = () => {
        helpAdmin.deleteCategory(id); 
    }

    return (
        <>
            <div className='adminFaq__header'>
                <div className='adminFaq__question-cont admin-cat__icon-cont'>
                    <h3>Icon:</h3>
                    <div className='admin-cat__icon'>
                        <img alt='hero' src={process.env.REACT_APP_API_URL + icon} />
                    </div>
                </div>
                <div className='adminFaq__answer-cont admin-cat__answer-cont'>
                    <h3>Category Title:</h3>
                    <p>{title || 'no title added yet'}</p>
                </div>
                <div className='adminFaq__delete-cont about-blocks__card-del'>
                    <button title="delete category" onClick={onDeleteCategoryClick}>X</button> 
                </div>
                <div className='adminFaq__question-button about-blocks__card-button'>
                    <button title="edit category data" onClick={changeStyle} className={arrowStyle}></button>
                </div>
                <div className='adminFaq__question-button about-blocks__card-button'>
                    <button title="add/remove FAQ's" onClick={changeFaqStyle} className={faqArrowStyle}></button>
                </div>
            </div> 
            {displayDescr && <CategoryCardBody id={id} title={title} banner={banner} icon={icon} link={link}/>}
            {displayFaqs && <div><strong>faq's will be there {id}</strong></div>}
        </>
    );
});

export default CategoryCard;