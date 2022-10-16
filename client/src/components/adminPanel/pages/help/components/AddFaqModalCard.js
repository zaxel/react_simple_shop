import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { Context } from '../../../../..';
import { setFaqCategory } from '../../../../../utils/staticPages/helpPage';


const AddFaqModalCard = ({ question, id, setLoading }) => {
  const { helpAdmin } = useContext(Context);

  const addFaq = async (id) => { 
    setLoading(true);
    await helpAdmin.setFaqCategory({id, categoryId: helpAdmin.activeCatBody}); 
    await setFaqCategory(helpAdmin, id, helpAdmin.activeCatBody); 
    setLoading(false);
  }

  return (
    <li>
      <Button variant="secondary" onClick={() => addFaq(id)}></Button>
      <div className='block-modal__title-cont adminFaq-modal__title-cont'> 
        <h5>{question}</h5>
      </div>
    </li>
  );
};

export default AddFaqModalCard;