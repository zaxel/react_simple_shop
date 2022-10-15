import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { Context } from '../../../../..';
import { changeFaqAnswer, changeFaqQuestion, fetchRelatedRelations } from '../../../../../utils/staticPages/helpPage';
import AdminTextArea from '../../../commonComponents/AdminTextArea';
import AdminTextInput from '../../../commonComponents/AdminTextInput';
import CategoryFaqCard from './CategoryFaqCard';
import Related from './Related'; 

const CategoryCardFaqs = observer(({ question, answer, onAddRelatedFaqClick }) => {
    const { helpAdmin } = useContext(Context);
    const [loading, setLoading] = useState(false);

    // const faqs = [{id:1},{id:2},{id:3},{id:4},{id:5},{id:6},{id:7},{id:8},{id:9},{id:10},{id:11},{id:12},{id:13},{id:14},{id:15}].map(el => <Related key={el.id} setBodyLoading={setLoading} faq={helpAdmin.questions.find(quest=>quest.id === el.infoHelpQuestionId)} />);
    const faqs = [{id:1},{id:2},{id:3},{id:4},{id:5},{id:6},{id:7},{id:8},{id:9},{id:10},{id:11},{id:12},{id:13},{id:14},{id:15}].map(el => <CategoryFaqCard key={el.id} setBodyLoading={setLoading} faq={el} />);
    
    useEffect(() => {
        (async () => {
            // setLoading(true)
            // await fetchRelatedRelations(helpAdmin, question.id);
            // setLoading(false)
        })()

    }, [])
    if (loading) {
        return (
            <div className="spinner">
                <Spinner animation="border" />
            </div>
        )
    }
    return (
        <div className='about-blocks__card-body'>
            <div className='about-blocks__body-battons'>
                <h3>category FAQ's:</h3>
                <div className='about-blocks__battons-wrapper'>
                    <ul className='adminFaq__related-cont'>
                        {faqs.length ? faqs : <li className='adminFaq__norelated'>No FAQ's added yet</li>}
                        {/* <li>li text</li> */}
                    </ul>
                </div>

            </div>
        </div>
    );
});

export default CategoryCardFaqs;