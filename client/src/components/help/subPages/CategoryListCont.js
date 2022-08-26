import React, {useEffect, useState} from 'react';
import Progress from './Progress';
import CategoryList from './CategoryList';
import Button from './Button';
import FooterCard from '../FooterCard';

const CategoryListCont = ({faqs, ...rest}) => {
    const itemsPerPage = 12;
    const total = faqs.length;
    const maxPage = Math.ceil(total/itemsPerPage);

    const [page, setPage] = useState(1);
    const [items, setItems] = useState(faqs.filter(faq=>faq.id<=page * itemsPerPage).map(item=><FooterCard key={item.id} {...item}/>));
    const [disabled, setDisabled] = useState(maxPage < page + 2 ? true : false);
    const [count, setCount] = useState(itemsPerPage*page < faqs.length ? itemsPerPage*page : faqs.length);
    
    useEffect(()=>{
        setItems(el=>faqs.filter(faq=>faq.id<=page * itemsPerPage).map(item=><FooterCard key={item.id} {...item}/>));
        setCount(()=>itemsPerPage*page < faqs.length ? itemsPerPage*page : faqs.length)
        
    }, [page, faqs]) 
    
    useEffect(()=>{
        setPage(1);
        // if(maxPage < page){
        //     setDisabled(true);
        // }
        console.log(maxPage, page)
        setDisabled(maxPage < page + 2 ? true : false);
    }, [faqs]) 

    const onLoadMoreClick = () => {
            setPage(page=>page+1);
            // console.log(page, maxPage)

            if(maxPage < page + 2){
            setDisabled(true);
        }
    }

    return (
        <div className='popular-cont help__cat-list'>
            <CategoryList faqs={faqs} page={page} items={items}/>
            <Progress count={count} total={total}/>
            <Button onLoadMoreClick={onLoadMoreClick} disabled={disabled}/>
        </div>
    );
};

export default CategoryListCont;