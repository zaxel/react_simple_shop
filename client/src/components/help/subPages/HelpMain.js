import React, { useContext, useEffect } from 'react';
import Banner from './../Banner'
import Cards from './../Cards';
import Footer from './../Footer';
import { Context } from '../../..';
import { Spinner } from 'react-bootstrap';
import { fetchPage, fetchFaqCategory, fetchStarterQuestions, fetchPopularFaqs } from '../../../utils/staticPages/helpPage';
import BreadCrumbs from './BreadCrumbs';

const HelpMain = () => { 
    const {helpPage} = useContext(Context);

    const getStarterQuestions = () => {
        const categoriesIds = helpPage.categories.map(cat=>cat.id);
        fetchStarterQuestions(helpPage, JSON.stringify(categoriesIds));
    }

    useEffect(()=>{
        (async()=>{
            fetchPage(helpPage);
            fetchPopularFaqs(helpPage);
            await fetchFaqCategory(helpPage);
            getStarterQuestions();
        })()
        
    }, [])

    if (helpPage.loading) {
        return( <div className="spinner">
            <Spinner animation="border" />
        </div>)
    }
    return (
        <>
            <BreadCrumbs active={1}/>
            <Banner />
            <Cards />
            <Footer />
        </>
    );
};

export default HelpMain;