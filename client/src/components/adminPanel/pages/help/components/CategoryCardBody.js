import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { Context } from '../../../../..';
import { changeCatData } from '../../../../../utils/staticPages/helpPage';
import AdminImage from '../../../commonComponents/AdminImage';
import AdminTextInput from '../../../commonComponents/AdminTextInput'; 

const CategoryCardBody = observer(({ id, title, banner, icon, link }) => {
    const { helpAdmin } = useContext(Context);
    const [loading, setLoading] = useState(false);

    const changeCatTitleCarried = changeCatData.bind(this, id, 'title', helpAdmin);
    const changeCatLinkCarried = changeCatData.bind(this, id, 'link', helpAdmin);
    // const changeAnswerTextCarried = changeFaqAnswer.bind(this, answer.answerId, 'text', helpAdmin);

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
                <AdminTextInput inputTitle={'Title'} inputText={title || 'no title added yet'} cb={changeCatTitleCarried} />
            </div>
            <div className='about-blocks__body-text'>
                <AdminTextInput inputTitle={'Link'} inputText={link || '/help/...your_link.../'} cb={changeCatLinkCarried} />
            </div> 
            <div className='about-blocks__body-imgs'>
                    <h3>Edit images:</h3>
                    <div className='about-blocks__body-images'>
                        <div className='about-blocks__body-image'>
                
                            <AdminImage id={id} index={0} inputTitle={'main banner:'} inputData={banner} imgDbCollName={'banner'} cb={()=>console.log(33)} alt={'banner'} />
                        </div>
                        <div className='about-blocks__body-image'>
                            <AdminImage id={id} index={1} inputTitle={'icon:'} inputData={icon} imgDbCollName={'icon'} cb={()=>console.log(33)} alt={'icon'} />
                        </div>
                    </div>
                </div>
            
        </div>
    );
});

export default CategoryCardBody;