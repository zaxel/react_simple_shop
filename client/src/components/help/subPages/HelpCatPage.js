import React from 'react';
import BreadCrumbs from './BreadCrumbs';
import MainContainer from './MainContainer';
import HelpAside from './HelpAside';

import { helpCategories } from '../../../utils/consts/helpPageData';

const HelpCatPage = ({path}) => {
    const [ categoryData ] = helpCategories.filter(cat=>cat.link === path);
    return (
        <>
            <BreadCrumbs {...categoryData}/>
            <div className='help__main-wrapper'>
                <MainContainer {...categoryData}/>
                <HelpAside/>
            </div>
        </>
    );

};

export default HelpCatPage;