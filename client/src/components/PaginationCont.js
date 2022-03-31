import React, { useState, } from 'react';
import { Pagination } from 'react-bootstrap';
import useWindowSize from '../hooks/useWindowSize';

const PaginationCont = () => {
    let items = [];
    let pages = 8;
    const [active, setActive] = useState(1);
    const [width, height] = useWindowSize();


    const changePage = (number) => {
        if (isNaN(number)) return;
        setActive(number);
    }

    return (
        <div className='pagination__cont'>
            <Pagination size="lg">
                {(active > 2 && width>500) && <>
                    <Pagination.First onClick={(e) => changePage(1)} />
                    <Pagination.Prev onClick={(e) => changePage(active - 1)} />
                    <Pagination.Item onClick={(e) => changePage(e.target.innerHTML)}>{1}</Pagination.Item>
                    <Pagination.Ellipsis />
                </>}
                {active > 1 && <Pagination.Item onClick={(e) => changePage(e.target.innerHTML)}>{active - 1}</Pagination.Item>}
                <Pagination.Item active onClick={(e) => changePage(e.target.innerHTML)}>{active}</Pagination.Item>
                {active < pages && <Pagination.Item onClick={(e) => changePage(e.target.innerHTML)}>{+active + 1}</Pagination.Item>}
                {(active < pages - 1 && width>500) && <>
                    <Pagination.Ellipsis />
                    <Pagination.Item onClick={(e) => changePage(pages)}>{pages}</Pagination.Item>
                    <Pagination.Next onClick={(e) => changePage(+active + 1)} />
                    <Pagination.Last onClick={(e) => changePage(pages)} />
                </>}

            </Pagination>
        </div>
    );
};

export default PaginationCont;