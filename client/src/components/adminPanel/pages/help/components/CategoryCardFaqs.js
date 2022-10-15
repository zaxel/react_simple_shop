import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { Context } from '../../../../..';
import { changeFaqAnswer, changeFaqQuestion, fetchRelatedRelations } from '../../../../../utils/staticPages/helpPage';
import AdminTextArea from '../../../commonComponents/AdminTextArea';
import AdminTextInput from '../../../commonComponents/AdminTextInput';
import Related from './Related'; 

const CategoryCardFaqs = observer(({ question, answer, onAddRelatedFaqClick }) => {
    const { helpAdmin } = useContext(Context);
    const [loading, setLoading] = useState(false);

    // const relatedFaqs = helpAdmin.faqRelated.map(el => <Related key={el.id} setBodyLoading={setLoading} faq={helpAdmin.questions.find(quest=>quest.id === el.infoHelpQuestionId)} />);
    
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
                        {/* {relatedFaqs.length ? relatedFaqs : <li className='adminFaq__norelated'>No related FAQ's added</li>} */}
                        <li>li text</li>
                    </ul>
                </div>

            </div>
        </div>
    );
});

export default CategoryCardFaqs;