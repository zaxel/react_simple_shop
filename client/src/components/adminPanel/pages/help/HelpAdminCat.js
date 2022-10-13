import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../../../..';
import { Spinner } from 'react-bootstrap';
import { fetchFaqCategory } from '../../../../utils/staticPages/helpPage';
import CategoryCard from './components/CategoryCard';
import AddNewCat from './components/AddNewCat';


const HelpAdminCat = observer(() => {
    const { helpAdmin } = useContext(Context);
    const [newCatLoading, setNewCatLoading] = useState(false);


    useEffect(() => {
        fetchFaqCategory(helpAdmin);
        helpAdmin.setActiveCatEdit(null);
        helpAdmin.setLoading(false);
    }, [])

    const categories = helpAdmin.categories.slice()
        // .sort((a,b)=>a.order_id-b.order_id)
        .map(category=><CategoryCard key={category.id} category={category} />);
        

    if (helpAdmin.loading) {
        return (
            <div className="spinner">
                <Spinner animation="border" />
            </div>
        )
    }
    return (
        <div className='admin-pages__page adminFaq'>
            <h2>Edit Categories of Help Page".</h2>
            <div className='adminFaq__container'>
                <h4>edit existing FAQ's:</h4>
                <ul>
                    {categories}
                </ul>
                <h4>create new categories:</h4>
                {newCatLoading ?
                    <div className="spinner about-blocks__spinner">
                        <Spinner animation="border" />
                    </div> :
                    <AddNewCat setNewCatLoading={setNewCatLoading}/>}
            </div>
        </div>
    );
});

export default HelpAdminCat;