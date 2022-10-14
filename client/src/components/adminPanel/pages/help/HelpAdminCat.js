import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../../../..';
import { Spinner } from 'react-bootstrap';
import { fetchFaqCategory } from '../../../../utils/staticPages/helpPage';
import CategoryCard from './components/CategoryCard';
import AddNewCat from './components/AddNewCat';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';


const HelpAdminCat = observer(() => {
    const { helpAdmin } = useContext(Context);
    const [newCatLoading, setNewCatLoading] = useState(false);


    useEffect(() => {
        (async()=>{
            helpAdmin.setLoading(true);
            await fetchFaqCategory(helpAdmin);
            helpAdmin.setActiveCatEdit(null);
            helpAdmin.setLoading(false);
        })()
    }, [])
        
        const categories = helpAdmin.categories.slice()
        .sort((a, b) => a.order_id - b.order_id)
        .map(category => {
            return <Draggable key={category.id} draggableId={'draggable-'+category.id} index={category.order_id}>
                {(provided, snapshot) => (
                    <li className='admin-about__card' key={category.id} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <CategoryCard category={category} />
                    </li>
                )}
            </Draggable>
        })

    const setCategoryPosition = ({destination, source}) => {
        helpAdmin.setCatPosition( source.index, destination.index);
    }

    if (helpAdmin.loading) {
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
        <div className='admin-pages__page adminFaq'>
            <h2>Edit Categories of Help Page".</h2>
            <div className='adminFaq__container'>
                <h4>edit existing FAQ's:</h4>
                <Droppable droppableId="droppable-1">
                            {(provided, snapshot) => (
                                <ul className='admin-about__cards-cont' ref={provided.innerRef} {...provided.droppableProps}>
                                    {categories.length ? categories : 'no categories added yet!'}
                                    {provided.placeholder}
                                </ul>
                            )}
                        </Droppable>
                <h4>create new categories:</h4>
                {newCatLoading ?
                    <div className="spinner about-blocks__spinner">
                        <Spinner animation="border" />
                    </div> :
                    <AddNewCat setNewCatLoading={setNewCatLoading}/>}
            </div>
        </div>
        </DragDropContext>);
});

export default HelpAdminCat;