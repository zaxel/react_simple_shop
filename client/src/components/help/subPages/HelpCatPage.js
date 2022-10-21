import React, { useContext, useEffect, useState } from 'react';
import BreadCrumbs from './BreadCrumbs'; 
import MainContainer from './MainContainer';
import HelpAside from './HelpAside';
import { Context } from '../../..';
import { fetchFaqCategory, fetchPage } from '../../../utils/staticPages/helpPage';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import ErrorPage from '../../../pages/ErrorPage';
// import { helpCategories } from '../../../utils/consts/helpPageData';


const HelpCatPage = observer(({path}) => {
    let { catname } = useParams();
    const { helpPage } = useContext(Context);
    const [wrongPage, setWrongPage] = useState(false);
    
    useEffect(()=>{
        (async()=>{
            try{
                if(!helpPage.contactTitle)
                    fetchPage(helpPage);
                if(!helpPage.categories.length){
                    const data = await fetchFaqCategory(helpPage);
                    const catLinks = helpPage.categories.map(cat=>cat.link.slice(1))
                    if(!catLinks.includes(catname)){
                        setWrongPage(true);
                    }
                }
            }catch(err){
                setWrongPage(true);
                console.log(err);
            }
        })()
    }, []) 

    const [ categoryData ] = helpPage.categories.filter(cat=>cat.link.slice(1) === catname);
    
    if(wrongPage) 
        return <ErrorPage/>

    return ( 
        <>
            {/* <BreadCrumbs {...categoryData}/> */}
            <div className='help__main-wrapper'>
                <MainContainer {...categoryData}/>
                <HelpAside/> 
            </div> 
        </>
    );

});

export default HelpCatPage;