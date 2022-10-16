import React, { useContext } from 'react';
import { Context } from '../../../../..';
import { setFaqCategory } from '../../../../../utils/staticPages/helpPage';

const CategoryFaqCard = ({faq, setBodyLoading}) => {
    const {helpAdmin} = useContext(Context);

    const removeBtn = async () => {
        setBodyLoading(true);
        await setFaqCategory(helpAdmin, faq.id, null);
        setBodyLoading(false);
    }

    return (
        <li className='adminFaq__related adminFaq__category-faqs'>
            <div>drag here</div>
            <button onClick={removeBtn}>{faq.question}</button>
        </li>
    )
};

export default CategoryFaqCard;