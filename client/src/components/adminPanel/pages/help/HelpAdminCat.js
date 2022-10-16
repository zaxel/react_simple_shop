import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../../../..';
import { Spinner } from 'react-bootstrap';
import { fetchFaqCategory } from '../../../../utils/staticPages/helpPage';
import CategoryCard from './components/CategoryCard';
import AddNewCat from './components/AddNewCat';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import AddFaqModal from './components/AddFaqModal';


const HelpAdminCat = observer(() => {
    const { helpAdmin } = useContext(Context);
    const [newCatLoading, setNewCatLoading] = useState(false);
    const [buttonStyle, setButtonStyle] = useState('hide');
    const [addFaqVisible, setAddFaqVisible] = useState(false);

    useEffect(() => {
        (async () => {
            helpAdmin.setLoading(true);
            await fetchFaqCategory(helpAdmin);
            helpAdmin.setActiveCatEdit(null);
            helpAdmin.setLoading(false);
        })()
    }, [])

    const categories = helpAdmin.categories.slice()
        .sort((a, b) => a.order_id - b.order_id)
        .map(category => {
            return <Draggable isDragDisabled={helpAdmin.activeCatBody === category.id ? true : false} key={category.id} draggableId={'draggable-' + category.id} index={category.order_id}>
                {(provided, snapshot) => ( 
                    <li className='admin-about__card' key={category.id} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <CategoryCard setButtonStyle={setButtonStyle} category={category} />
                    </li>
                )}
            </Draggable> 
        })
    const onAddFaqClick = async () => {
        setAddFaqVisible(true);
        setButtonStyle('hide');
    }
    const onFaqModalHide = async () => {
        setAddFaqVisible(false);
        setButtonStyle('show');
    }
    const setCategoryPosition = ({ destination, source }) => {
        helpAdmin.setCatPosition(source.index, destination.index);
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
                    <h4>add/remove/sort FAQ's</h4>
                    <h4>(drag and drop FAQ's to change order):</h4>
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
                        <AddNewCat setNewCatLoading={setNewCatLoading} />}
                </div>
                <button className={buttonStyle} onClick={onAddFaqClick}>Add Faq To Category</button>
                <AddFaqModal show={addFaqVisible} onHide={onFaqModalHide}/>
            </div>
        </DragDropContext>);
});

export default HelpAdminCat;