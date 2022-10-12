import React, { useContext } from 'react';
import { Context } from '../../../../..';
import { removeRelatedFaq } from '../../../../../utils/staticPages/helpPage';

const Related = ({faq, setBodyLoading}) => {
    const {helpAdmin} = useContext(Context);

    const addBtn = async () => {
        setBodyLoading(true);
        const currentFaq = helpAdmin.activeFaqEdit;
        await removeRelatedFaq(helpAdmin, currentFaq, faq.id)
        setBodyLoading(false);
    }

    return (
        <li className='adminFaq__related'>
            <button onClick={addBtn}>{faq.question}</button>
        </li>
    )
};

export default Related;