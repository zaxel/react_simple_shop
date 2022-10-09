import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../../../..';
import Faq from './components/Faq';
import { Spinner } from 'react-bootstrap';
import AddNewFaq from './components/AddNewFaq';
import AddFaqModal from './components/AddFaqModal';
import { fetchAllFaqs } from '../../../../utils/staticPages/helpPage';


const HelpAdminFaq = observer(() => {
    const { helpAdmin } = useContext(Context);
    const [addFaqVisible, setAddFaqVisible] = useState(false);
    const [newFaqLoading, setNewFaqLoading] = useState(false);

    const onAddRelatedFaqClick = async () => {
        setAddFaqVisible(true);
        helpAdmin.setModalFaqLoading(true);
        // await fetchAllFaqs(aboutPage);
        helpAdmin.setModalFaqLoading(false);
    }

    useEffect(() => {
        fetchAllFaqs(helpAdmin);
        // fetchBtnsModal(aboutPage);
        helpAdmin.setActiveFaqEdit(null);
    }, [])

    const faqs = helpAdmin.questions.slice()
        .sort((a,b)=>a.order_id-b.order_id)
        .map(faq=><Faq key={faq.id} question={faq} answer={helpAdmin.answers.find(answer=>answer.answerId === faq.infoHelpAnswerId)} onAddRelatedFaqClick={onAddRelatedFaqClick}/>);
        

    if (helpAdmin.loading) {
        return (
            <div className="spinner">
                <Spinner animation="border" />
            </div>
        )
    }
    return (
        <div className='admin-pages__page adminFaq'>
            <h2>Edit FAQS of Help Page".</h2>
            <div className='adminFaq__container'>
                <h4>edit existing FAQ's:</h4>
                <ul>
                    {faqs}
                </ul>
                <h4>create new FAQ's:</h4>
                {newFaqLoading ?
                    <div className="spinner about-blocks__spinner">
                        <Spinner animation="border" />
                    </div> :
                    <AddNewFaq />}
            </div>
            <AddFaqModal show={addFaqVisible} onHide={() => setAddFaqVisible(false)}/>
        </div>
    );
});

export default HelpAdminFaq;