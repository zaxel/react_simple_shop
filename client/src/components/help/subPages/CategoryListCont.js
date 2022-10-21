import React, { useCallback, useContext, useEffect, useState } from 'react';
import Progress from './Progress';
import CategoryList from './CategoryList';
import Button from './Button';
import FooterCard from '../FooterCard';
import { Spinner } from 'react-bootstrap';
import { Context } from '../../..';
import { observer } from 'mobx-react-lite';
import { fetchCategoryFaqQuestions } from '../../../utils/staticPages/helpPage';

const CategoryListCont = observer(({ id }) => {
    const { helpPage } = useContext(Context);
    const itemsPerPage = 12;
    let maxPage = Math.ceil(helpPage.totalFaqs / itemsPerPage); 

    let items = [] 
    if(helpPage.questions.length)
        items = helpPage.questions.map(item => <FooterCard key={item.id} {...item}/>);

    const [loading, setLoading] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const calcItemsCount = () => {
        return itemsPerPage * helpPage.faqsPage < helpPage.totalFaqs  ? itemsPerPage * helpPage.faqsPage : helpPage.totalFaqs;
    }
    const [count, setCount] = useState(0);

    useEffect(()=>{
        (async()=>{
            if(id){
                setLoading(true);
                await helpPage.resetQuestions();
                await fetchCategoryFaqQuestions(helpPage, id, helpPage.faqsPage, itemsPerPage);
                setCount(calcItemsCount());
                maxPage = Math.ceil(helpPage.totalFaqs / itemsPerPage);
                setDisabled(maxPage < helpPage.faqsPage + 2 ? true : false)
                setLoading(false);
            }
        })()
    }, [id])
    
    useEffect(() => {
        if(helpPage.faqsPage >= maxPage){
            setDisabled(true);
        }
    }, [helpPage.faqsPage])

    const onLoadMoreClick = async() => {
        setLoadingMore(true);
        helpPage.setFaqsPage(helpPage.faqsPage + 1);
        await fetchCategoryFaqQuestions(helpPage, id, helpPage.faqsPage, itemsPerPage);
        setCount(calcItemsCount());
        setLoadingMore(false); 
    }

    if (loading) {
        return (<div className="spinner">
            <Spinner animation="border" /> 
        </div>)
    }
    return (
        <div className='popular-cont help__cat-list'>
            <CategoryList faqs={helpPage.questions} items={items}/>
            <Progress count={count} total={helpPage.totalFaqs} /> 
            {loadingMore ? <Spinner animation="border" /> : <Button onLoadMoreClick={onLoadMoreClick} disabled={disabled} />}
        </div>
    );
});

export default CategoryListCont;