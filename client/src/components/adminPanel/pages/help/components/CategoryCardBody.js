import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { Context } from '../../../../..';
import { changeFaqAnswer, changeFaqQuestion, fetchRelatedRelations } from '../../../../../utils/staticPages/helpPage';
import AdminImage from '../../../commonComponents/AdminImage';
import AdminTextArea from '../../../commonComponents/AdminTextArea';
import AdminTextInput from '../../../commonComponents/AdminTextInput'; 

const CategoryCardBody = observer(({ id, title, banner, icon, link }) => {
    const { helpAdmin } = useContext(Context);
    const [loading, setLoading] = useState(false);

    // const changeQuestionCarried = changeFaqQuestion.bind(this, question.id, 'question', helpAdmin);
    // const changeAnswerTitleCarried = changeFaqAnswer.bind(this, answer.answerId, 'title', helpAdmin);
    // const changeAnswerTextCarried = changeFaqAnswer.bind(this, answer.answerId, 'text', helpAdmin);

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
            <div className='about-blocks__body-title'>
                <AdminTextInput inputTitle={'Title'} inputText={'no title added yet'} cb={()=>console.log(88)} />
            </div>
            <div className='about-blocks__body-text'>
                <AdminTextInput inputTitle={'Link'} inputText={'/help/...your_link.../'} cb={()=>console.log(88)} />
            </div> 
            <div className='about-blocks__body-imgs'>
                    <h3>Edit images:</h3>
                    <div className='about-blocks__body-images'>
                        <div className='about-blocks__body-image'>
                            <AdminImage id={20} index={0} inputTitle={'main banner:'} inputData={'0aa5c45e-2a2e-4feb-a4f4-4367d835ac26.jpg'} cb={()=>console.log(33)} alt={'banner'} />
                        </div>
                        <div className='about-blocks__body-image'>
                            <AdminImage id={21} index={1} inputTitle={'icon:'} inputData={'delivery.svg'} cb={()=>console.log(33)} alt={'icon'} />
                        </div>
                    </div>
                </div>
            
        </div>
    );
});

export default CategoryCardBody;