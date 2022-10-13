import { observer } from 'mobx-react-lite';
import React, {useContext, useState, useEffect} from 'react';
import { Context } from '../../../../..';
import CategoryCardBody from './CategoryCardBody';

const CategoryCard = observer(({category}) => {
    const { helpAdmin } = useContext(Context);
    const [arrowStyle, setArrowStyle] = useState('arrow');
    const [displayDescr, setDisplayDescr] = useState(false);

    const changeStyle = () => {
        helpAdmin.activeCatEdit === category.id ? helpAdmin.setActiveCatEdit(null) : helpAdmin.setActiveCatEdit(category.id);
    }

    useEffect(() => {
        if (helpAdmin.activeCatEdit === category.id) {
            setArrowStyle('arrowDown');
            setDisplayDescr(true);
        } else {
            setArrowStyle('arrow');
            setDisplayDescr(false);
        }
    }, [helpAdmin.activeCatEdit])

    const onDeleteCategoryClick = () => {
        helpAdmin.deleteCategory(category.id);
    }

    return (
        <li>
            <div className='adminFaq__header'>
                <div className='adminFaq__question-cont admin-cat__icon-cont'>
                    <h3>Icon:</h3>
                    <div className='admin-cat__icon'>
                        <img alt='hero' src={process.env.REACT_APP_API_URL + 'delivery.svg'} />
                        {/* <img alt='hero' src={process.env.REACT_APP_API_URL + '0bde358d-809f-4307-847b-1bc9fa9fd960.jpg'} /> */}
                    </div>
                </div>
                <div className='adminFaq__answer-cont admin-cat__answer-cont'>
                    <h3>Category Title:</h3>
                    <p>{category?.title || 'no title added yet'}</p>
                </div>
                <div className='adminFaq__delete-cont about-blocks__card-del'>
                    <button onClick={onDeleteCategoryClick}>X</button> 
                </div>
                <div className='adminFaq__question-button about-blocks__card-button'>
                    <button onClick={changeStyle} className={arrowStyle}></button>
                </div>
            </div>
            {displayDescr && <CategoryCardBody id={category.id} title={category.title} banner={category.banner} icon={category.icon} link={category.link}/>}
        </li>
    );
});

export default CategoryCard;