import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { Context } from '../../../../..';
import { addRelatedFaq } from '../../../../../utils/staticPages/helpPage';

const FaqModalCard = observer(({ category, text, id }) => {
    const { helpAdmin } = useContext(Context);

    const addRelated = async (newRelId) => {
        helpAdmin.setModalFaqLoading(true);
        const currentFaq = helpAdmin.activeFaqEdit;
        await addRelatedFaq(helpAdmin, currentFaq, newRelId);
        helpAdmin.setModalFaqLoading(false);
    }

    return (
        <li>
            <Button variant="secondary" onClick={() => addRelated(id)}></Button>
            <div className='block-modal__link-cont'>
                <h5>category:</h5>
                <p>{category}</p>
            </div>
            <div className='block-modal__title-cont faq-modal__title-cont'>
                <h5>question:</h5>
                <p>{text}</p>
            </div>
            
        </li>
    );
});

export default FaqModalCard;