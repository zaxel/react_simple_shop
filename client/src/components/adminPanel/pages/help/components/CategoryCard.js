import { observer } from 'mobx-react-lite';
import React, {useContext, useState, useEffect} from 'react';
import { Context } from '../../../../..';
import CategoryCardBody from './CategoryCardBody';

const CategoryCard = observer(({id, icon, title, banner, link}) => {
    const { helpAdmin } = useContext(Context);
    const [arrowStyle, setArrowStyle] = useState('arrow');
    const [displayDescr, setDisplayDescr] = useState(false);

    const changeStyle = () => {
        helpAdmin.activeCatEdit === id ? helpAdmin.setActiveCatEdit(null) : helpAdmin.setActiveCatEdit(id);
    }

    useEffect(() => {
        if (helpAdmin.activeCatEdit === id) {
            setArrowStyle('arrowDown');
            setDisplayDescr(true);
        } else {
            setArrowStyle('arrow');
            setDisplayDescr(false);
        }
    }, [helpAdmin.activeCatEdit])

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
                    <button onClick={onDeleteCategoryClick}>X</button> 
                </div>
                <div className='adminFaq__question-button about-blocks__card-button'>
                    <button onClick={changeStyle} className={arrowStyle}></button>
                </div>
            </div>
            {displayDescr && <CategoryCardBody id={id} title={title} banner={banner} icon={icon} link={link}/>}
        </>
    );
});

export default CategoryCard;