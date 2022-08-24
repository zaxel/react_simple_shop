import React from 'react';
import Banner from './../Banner'
import Cards from './../Cards';
import Footer from './../Footer';
import { helpCategories } from '../../../utils/consts/helpPageData';

const HelpMain = () => {
    return (
        <>
            <Banner />
            <Cards helpCategories={helpCategories} />
            <Footer />
        </>
    );
};

export default HelpMain;