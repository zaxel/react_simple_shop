import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import Progress from './Progress';
import CategoryList from './CategoryList';
import Button from './Button';
import FooterCard from '../FooterCard';
import { Spinner } from 'react-bootstrap';
import { Context } from '../../..';
import { observer } from 'mobx-react-lite';
import { fetchCategoryFaqQuestions, fetchSearchFaqQuestions } from '../../../utils/staticPages/helpPage';

const CategoryListCont = observer(({ id, title }) => {
    const { helpPage } = useContext(Context);
    const itemsPerPage = 12;
    const maxPageRef = useRef(0);
    
    const [loading, setLoading] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [count, setCount] = useState(0);

    const calcItemsCount = () => 
        Math.min(itemsPerPage * helpPage.faqsPage, helpPage.totalFaqs);

    useEffect(() => {
        maxPageRef.current = Math.ceil(helpPage.totalFaqs / itemsPerPage);
    }, [helpPage.totalFaqs]);
    
    useEffect(() => {
        (async () => {
            if (id) {
                setLoading(true);
                await helpPage.resetQuestions();
                await getFAQ();
                setCount(calcItemsCount());
                setLoading(false);
            }
        })();
    }, [id, title, helpPage, helpPage.searchPhrase]);

    const items = useMemo(() => helpPage.questions.map(item => <FooterCard key={item.id} {...item} />),[helpPage.questions]);

    async function getFAQ(){
        try {
            (title==="Search Result")
            ? await fetchSearchFaqQuestions(helpPage, helpPage.searchPhrase, helpPage.faqsPage, itemsPerPage)
            : await fetchCategoryFaqQuestions(helpPage, id, helpPage.faqsPage, itemsPerPage);
        } catch (error) {
            console.error("Failed to fetch FAQ:", error);
        }
    }
    const onLoadMoreClick = async () => {
        setLoadingMore(true);
        helpPage.setFaqsPage(helpPage.faqsPage + 1);
        await getFAQ();
        setCount(calcItemsCount());
        setLoadingMore(false);
    };

    if (loading) {
        return (
            <div className="spinner">
                <Spinner animation="border" />
            </div>
        );
    }
    if (!count) {
        return (
            <div className='help__error'>
                <h1 className='error__page'>Sorry, no results found.</h1>
            </div>
        );
    }

    return (
        <div className='popular-cont help__cat-list'>
            <CategoryList faqs={helpPage.questions} items={items}/>
            <Progress count={count} total={helpPage.totalFaqs} /> 
            {loadingMore ? <Spinner animation="border" /> : <Button onLoadMoreClick={onLoadMoreClick} disabled={helpPage.faqsPage >= maxPageRef.current} />}
        </div>
    );
});

export default CategoryListCont;
