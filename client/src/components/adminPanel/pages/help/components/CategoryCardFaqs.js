import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Spinner } from 'react-bootstrap';
import { Context } from '../../../../..';
import { fetchCategoryFaqQuestions } from '../../../../../utils/staticPages/helpPage';
import CategoryFaqCard from './CategoryFaqCard';

const CategoryCardFaqs = observer(({ categoryId }) => {
    const { helpAdmin } = useContext(Context);
    const [loading, setLoading] = useState(false);


    const faqs = helpAdmin.questions.slice()
        .sort((a, b) => a.order_id - b.order_id)
        .map(faq => {
            return <Draggable key={faq.id} draggableId={'draggable-' + faq.id} index={faq.order_id}>
                {(provided, snapshot) => (
                    <li className='adminFaq__related adminFaq__category-faqs' key={faq.id} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <CategoryFaqCard key={faq.id} setBodyLoading={setLoading} faq={faq} />
                    </li>
                )}
            </Draggable>
        })


    useEffect(() => {
        (async () => {
            setLoading(true);
            await fetchCategoryFaqQuestions(helpAdmin, categoryId);
            setLoading(false);
        })()
    }, [])

    const setCategoryPosition = ({ destination, source }) => {
        helpAdmin.setFaqPosition(source.index, destination.index);
    }

    if (loading) {
        return (
            <div className="spinner">
                <Spinner animation="border" />
            </div>
        )
    }
    return (
        <DragDropContext
            onDragEnd={setCategoryPosition}
        >
            <div className='about-blocks__card-body'>
                <div className='about-blocks__body-battons'>
                    <h3>category FAQ's</h3>
                    <h3>(darg and drop FAQ to change orders):</h3>
                    <div className='about-blocks__battons-wrapper'>

                        <Droppable droppableId="droppable-2">
                            {(provided, snapshot) => (
                                <ul className='adminFaq__related-cont' ref={provided.innerRef} {...provided.droppableProps}>
                                    {faqs.length ? faqs : <li className='adminFaq__norelated'>No FAQ's added yet</li>}
                                    {provided.placeholder}
                                </ul>
                            )}
                        </Droppable>
                    </div>
                </div>
            </div>
        </DragDropContext>
    );
});

export default CategoryCardFaqs;