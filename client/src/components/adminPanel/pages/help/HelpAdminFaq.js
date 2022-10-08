import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../../../..';
import Faq from './components/Faq';


const HelpAdminFaq = observer(() => {
    const { helpAdmin } = useContext(Context);
    // const [addBtnsVisible, setAddBtnsVisible] = useState(false);
    // const [newBlockLoading, setNewBlockLoading] = useState(false);

    // const onAddBtnsClick = async () => {
    //     // setAddBtnsVisible(true);
    //     // aboutPage.setModalBtnsLoading(true);
    //     // await fetchBtnsModal(aboutPage);
    //     // aboutPage.setModalBtnsLoading(false);
    // }

    useEffect(() => {
        // fetchBlocks(aboutPage);
        // fetchBtnsModal(aboutPage);
        helpAdmin.setActiveFaqEdit(null);
    }, [])

    const faqs = helpAdmin.questions.slice()
        .sort((a,b)=>a.order_id-b.order_id)
        .map(faq=><Faq key={faq.id} question={faq} answer={helpAdmin.answers.find(answer=>answer.id === faq.infoHelpAnswerId)}/>);
        

    // if (helpAdmin.loading) {
    //     return (
    //         <div className="spinner">
    //             <Spinner animation="border" />
    //         </div>
    //     )
    // }
    return (
        <div className='admin-pages__page adminFaq'>
            <h2>Edit FAQS of Help Page".</h2>
            <div className='adminFaq__container'>
                <h4>edit existing FAQ's:</h4>
                <ul>
                    {faqs}
                </ul>
                <h4>create new FAQ's:</h4>
                {/* {newBlockLoading ?
                    <div className="spinner about-blocks__spinner">
                        <Spinner animation="border" />
                    </div> :
                    <AddNewBlock />} */}
            </div>
        </div>
    );
});

export default HelpAdminFaq;