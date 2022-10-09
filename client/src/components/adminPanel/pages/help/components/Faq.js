import { observer } from 'mobx-react-lite';
import React, {useContext, useState, useEffect} from 'react';
import { Context } from '../../../../..';
import AdminTextArea from '../../../commonComponents/AdminTextArea';
import AdminTextInput from '../../../commonComponents/AdminTextInput';
import Related from './Related';


const Faq = observer(({question, answer, onAddRelatedFaqClick}) => {
    const { helpAdmin } = useContext(Context);
    const [arrowStyle, setArrowStyle] = useState('arrow');
    const [displayDescr, setDisplayDescr] = useState(false);

    const relatedFaqs = helpAdmin.questions.map(el=><Related key={el.id} question={el.question} />);
    // const relatedFaqs = null;

    const changeStyle = () => {
        helpAdmin.activeFaqEdit === question.id ? helpAdmin.setActiveFaqEdit(null) : helpAdmin.setActiveFaqEdit(question.id);
    }

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
                    <p>{answer?.text || 'no answer added yet'}</p>
                </div>
                <div className='adminFaq__delete-cont about-blocks__card-del'>
                    <button onClick={() => console.log(99)}>X</button>
                </div>
                <div className='adminFaq__question-button about-blocks__card-button'>
                    <button onClick={changeStyle} className={arrowStyle}></button>
                </div>
            </div>
            {displayDescr && <div className='about-blocks__card-body'>
                <div className='about-blocks__body-title'>
                    <AdminTextInput inputTitle={'Question'} inputText={question?.question || 'no question added yet'} cb={()=>console.log(99)}/>
                </div>
                <div className='about-blocks__body-text'>
                    <AdminTextInput inputTitle={'Answer Title'} inputText={answer?.title || 'no answer title added yet'} cb={()=>console.log(99)}/>
                </div>
                <div className='about-blocks__body-text'>
                    <AdminTextArea areaTitle={'Answer Text'} areaText={answer?.text || 'no answer body added yet'} cb={()=>console.log(99)}/>
                </div>
                <div className='about-blocks__body-battons'> 
                    <h3>Related FAQ's:</h3>
                    <div className='about-blocks__battons-wrapper'>
                        <ul className='adminFaq__related-cont'>
                            {relatedFaqs || <li className='adminFaq__norelated'>No related FAQ's added</li>}
                        </ul>
                        <div className='about-blocks__btn-add'>
                            <button onClick={()=>onAddRelatedFaqClick()}>add related FAQ</button>
                        </div>
                    </div>

                </div>
            </div>}
        </li>
    );
});

export default Faq;