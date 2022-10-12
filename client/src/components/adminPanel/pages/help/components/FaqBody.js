import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { Context } from '../../../../..';
import { changeFaqAnswer, changeFaqQuestion, fetchRelatedRelations } from '../../../../../utils/staticPages/helpPage';
import AdminTextArea from '../../../commonComponents/AdminTextArea';
import AdminTextInput from '../../../commonComponents/AdminTextInput';
import Related from './Related'; 

const FaqBody = observer(({ question, answer, onAddRelatedFaqClick }) => {
    const { helpAdmin } = useContext(Context);
    const [loading, setLoading] = useState(false);

    const changeQuestionCarried = changeFaqQuestion.bind(this, question.id, 'question', helpAdmin);
    const changeAnswerTitleCarried = changeFaqAnswer.bind(this, answer.answerId, 'title', helpAdmin);
    const changeAnswerTextCarried = changeFaqAnswer.bind(this, answer.answerId, 'text', helpAdmin);

    const relatedFaqs = helpAdmin.faqRelated.map(el => <Related key={el.id} setBodyLoading={setLoading} faq={helpAdmin.questions.find(quest=>quest.id === el.infoHelpQuestionId)} />);
    
    useEffect(() => {
        (async () => {
            setLoading(true)
            await fetchRelatedRelations(helpAdmin, question.id);
            setLoading(false)
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
            <div className='about-blocks__body-title'>
                <AdminTextInput inputTitle={'Question'} inputText={question?.question || 'no question added yet'} cb={changeQuestionCarried} />
            </div>
            <div className='about-blocks__body-text'>
                <AdminTextInput inputTitle={'Answer Title'} inputText={answer?.title || 'no answer title added yet'} cb={changeAnswerTitleCarried} />
            </div>
            <div className='about-blocks__body-text'>
                <AdminTextArea areaTitle={'Answer Text'} areaText={answer?.text || 'no answer body added yet'} cb={changeAnswerTextCarried} />
            </div>
            <div className='about-blocks__body-battons'>
                <h3>Related FAQ's:</h3>
                <div className='about-blocks__battons-wrapper'>
                    <ul className='adminFaq__related-cont'>
                        {relatedFaqs.length ? relatedFaqs : <li className='adminFaq__norelated'>No related FAQ's added</li>}
                    </ul>
                    <div className='about-blocks__btn-add'>
                        <button onClick={() => onAddRelatedFaqClick()}>add related FAQ</button>
                    </div>
                </div>

            </div>
        </div>
    );
});

export default FaqBody;