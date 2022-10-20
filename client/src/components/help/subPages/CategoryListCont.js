import React, { useEffect, useState } from 'react';
import Progress from './Progress';
import CategoryList from './CategoryList';
import Button from './Button';
import FooterCard from '../FooterCard';
import { Spinner } from 'react-bootstrap';

const CategoryListCont = ({ faqs, ...rest }) => {
    if(!faqs)faqs = [];

    const itemsPerPage = 12;
    const totalFaqs = faqs.length;
    const maxPage = Math.ceil(totalFaqs / itemsPerPage);

    const [paginationNumber, setPaginationNumber] = useState(1);
    const [items, setItems] = useState(faqs.filter(faq => faq.id <= paginationNumber * itemsPerPage).map(item => <FooterCard key={item.id} {...item} />));
    const [disabled, setDisabled] = useState(maxPage < paginationNumber + 2 ? true : false);
    const [loadingMore, setLoadingMore] = useState(false);
    const calcItemsCount = () => {
        return itemsPerPage * paginationNumber < faqs.length ? itemsPerPage * paginationNumber : faqs.length;
    }
    const [count, setCount] = useState(calcItemsCount());
    
    // useEffect(() => {
    //     setItems(() => faqs.filter(faq => faq.id <= paginationNumber * itemsPerPage).map(item => <FooterCard key={item.id} {...item} />));
    //     setCount(() => calcItemsCount())
    // }, [paginationNumber, faqs])

    useEffect(() => {
        setPaginationNumber(1);
        setDisabled(false);
    }, [faqs])

    useEffect(() => {
        if(paginationNumber >= maxPage){
            setDisabled(true);
        }
    }, [paginationNumber])

    const onLoadMoreClick = () => {
        setLoadingMore(true);
        setTimeout(()=>{
            setPaginationNumber(paginationNumber => paginationNumber + 1);
            setLoadingMore(false);
        }, 2000)
        
    }
    console.log('render')
    return (
        <div className='popular-cont help__cat-list'>
            {/* <CategoryList faqs={faqs} paginationNumber={paginationNumber} items={items} /> */}
            {/* <Progress count={count} total={totalFaqs} /> */}
            
            {loadingMore ? <Spinner animation="border" /> : <Button onLoadMoreClick={onLoadMoreClick} disabled={disabled} />}
        </div>
    );
};

export default CategoryListCont;