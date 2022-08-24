import React from 'react';
import BreadCrumbs from './BreadCrumbs';
import MainContainer from './MainContainer';
import HelpAside from './HelpAside';


const HelpCatPage = () => {
    return (
        <>
            <BreadCrumbs/>
            <div className='help__main-wrapper'>
                <MainContainer/>
                <HelpAside/>
            </div>
        </>
    );

};

export default HelpCatPage;