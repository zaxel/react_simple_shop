import React, { useContext } from 'react';
import { Context } from '../../../../..';
import { removeRelatedFaq } from '../../../../../utils/staticPages/helpPage';

const CategoryFaqCard = ({faq, setBodyLoading}) => {
    const {helpAdmin} = useContext(Context);

    const removeBtn = async () => {
        console.log(faq.id)
        // setBodyLoading(true);
        // const currentFaq = helpAdmin.activeFaqEdit;
        // await removeRelatedFaq(helpAdmin, currentFaq, faq.id);
        // setBodyLoading(false);
    }

    return (
        <li className='adminFaq__related adminFaq__category-faqs'>
            <div>drag here</div>
            <button onClick={removeBtn}>{faq.question}</button>

        </li>
    )
};

export default CategoryFaqCard;