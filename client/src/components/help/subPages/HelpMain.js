import React, { useContext, useEffect } from 'react';
import Banner from './../Banner'
import Cards from './../Cards';
import Footer from './../Footer';
import { helpCategories } from '../../../utils/consts/helpPageData';
import { popularFaqs } from '../../../utils/consts/helpPageData';
import { Context } from '../../..';
import { Spinner } from 'react-bootstrap';
import { fetchPage } from '../../../utils/staticPages/helpPage';

const HelpMain = () => {
    const {helpPage} = useContext(Context);

    useEffect(()=>{
        fetchPage(helpPage);
    }, [])

    if (helpPage.loading) {
        return( <div className="spinner">
            <Spinner animation="border" />
        </div>)
    }
    return (
        <>
            <Banner />
            <Cards helpCategories={helpCategories} />
            <Footer popularFaqs={popularFaqs} helpCategories={helpCategories}/>
        </>
    );
};

export default HelpMain;