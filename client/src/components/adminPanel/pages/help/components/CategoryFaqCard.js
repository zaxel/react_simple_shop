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
        <>  
            <div>drag here</div>
            <button onClick={removeBtn}>{faq.question}</button>
        </>
    )
};

export default CategoryFaqCard;