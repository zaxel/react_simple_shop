import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { Context } from '../../../../..';
import { fetchCategoryFaqQuestions } from '../../../../../utils/staticPages/helpPage';
import CategoryFaqCard from './CategoryFaqCard';

const CategoryCardFaqs = observer(({ categoryId }) => {
    const { helpAdmin } = useContext(Context);
    const [loading, setLoading] = useState(false);

    const faqs = helpAdmin.questions.map(el => <CategoryFaqCard key={el.id} setBodyLoading={setLoading} faq={el} />);
     
    useEffect(() => {
        (async () => {
            setLoading(true);
            await fetchCategoryFaqQuestions(helpAdmin, categoryId);
            setLoading(false);
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
                <h3>category FAQ's</h3>
                <h3>(darg and drop FAQ to change orders):</h3>
                <div className='about-blocks__battons-wrapper'>
                    <ul className='adminFaq__related-cont'>
                        {faqs.length ? faqs : <li className='adminFaq__norelated'>No FAQ's added yet</li>}
                    </ul>
                </div>

            </div>
        </div>
    );
});

export default CategoryCardFaqs;