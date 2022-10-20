import React, { useContext, useEffect } from 'react';
import Banner from './../Banner'
import Cards from './../Cards';
import Footer from './../Footer';
import { helpCategories } from '../../../utils/consts/helpPageData';
import { popularFaqs } from '../../../utils/consts/helpPageData';
import { Context } from '../../..';
import { Spinner } from 'react-bootstrap';
import { fetchPage, fetchFaqCategory, fetchStarterQuestions } from '../../../utils/staticPages/helpPage';

const HelpMain = () => {
    const {helpPage} = useContext(Context);

    const getStarterQuestions = () => {
        const categoriesIds = helpPage.categories.map(cat=>cat.id);
        fetchStarterQuestions(helpPage, JSON.stringify(categoriesIds));
    }

    useEffect(()=>{
        (async()=>{
            fetchPage(helpPage);
            await fetchFaqCategory(helpPage);
            getStarterQuestions();
        })()
        
    }, [])

    console.log('help main') 

    if (helpPage.loading) {
        return( <div className="spinner">
            <Spinner animation="border" />
        </div>)
    }
    return (
        <>
            <Banner />
            <Cards />
            <Footer popularFaqs={'popularFaqs'} helpCategories={'helpCategories'}/>
        </>
    );
};

export default HelpMain;