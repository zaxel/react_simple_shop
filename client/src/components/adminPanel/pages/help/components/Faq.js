import { observer } from 'mobx-react-lite';
import React, {useContext, useState, useEffect} from 'react';
import { Context } from '../../../../..';
import { deleteFaq } from '../../../../../utils/staticPages/helpPage';
import FaqBody from './FaqBody';

const Faq = observer(({question, answer, onAddRelatedFaqClick}) => {
    const { helpAdmin } = useContext(Context);
    const [arrowStyle, setArrowStyle] = useState('arrow');
    const [displayDescr, setDisplayDescr] = useState(false);

    const changeStyle = () => {
        helpAdmin.activeFaqEdit === question.id ? helpAdmin.setActiveFaqEdit(null) : helpAdmin.setActiveFaqEdit(question.id);
    }
    const pText = answer?.text ?? 'no answer added yet'; 

    useEffect(() => {
        if (helpAdmin.activeFaqEdit === question.id) {
            setArrowStyle('arrowDown');
            setDisplayDescr(true);
        } else {
            setArrowStyle('arrow');
            setDisplayDescr(false);
        }
    }, [helpAdmin.activeFaqEdit])

    return (
        <li>
            <div className='adminFaq__header'>
                <div className='adminFaq__question-cont'>
                    <h3>Question(first two lines):</h3>
                    <p>{question?.question || 'no question added yet'}</p>
                </div>
                <div className='adminFaq__answer-cont'>
                    <h3>Answer(first two lines):</h3>
                    <p dangerouslySetInnerHTML={{ __html: pText}}></p>
                </div>
                <div className='adminFaq__delete-cont about-blocks__card-del'>
                    <button onClick={deleteFaq.bind(this, answer.answerId, helpAdmin)}>X</button> 
                </div>
                <div className='adminFaq__question-button about-blocks__card-button'>
                    <button onClick={changeStyle} className={arrowStyle}></button>
                </div>
            </div>
            {displayDescr && <FaqBody question={question} answer={answer} onAddRelatedFaqClick={onAddRelatedFaqClick}/>}
        </li>
    );
});

export default Faq;