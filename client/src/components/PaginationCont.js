import React from 'react';
import { Pagination } from 'react-bootstrap';
import useWindowSize from '../hooks/useWindowSize';
import { observer } from 'mobx-react-lite';

const PaginationCont = observer(({currentStore}) => {
    const [width, height] = useWindowSize();

    const changePage = (number) => {
        if (isNaN(number)) return;
        currentStore.setActivePage(number);
    }


    return (
        <div className='pagination__cont'>
            <Pagination size="lg">
                {(currentStore.activePage > 2 && width > 500 && currentStore.pagesTotal > 4) && <>
                    <Pagination.First onClick={(e) => changePage(1)} />
                    <Pagination.Prev onClick={(e) => changePage(currentStore.activePage - 1)} />
                    <Pagination.Item onClick={(e) => changePage(e.target.innerHTML)}>{1}</Pagination.Item>
                    <Pagination.Ellipsis />
                </>}


                {+currentStore.activePage === 3 && +currentStore.pagesTotal === 3 && <Pagination.Item onClick={(e) => changePage(e.target.innerHTML)}>1</Pagination.Item>}
                {+currentStore.activePage === 4 && +currentStore.pagesTotal === 4 && <Pagination.Item onClick={(e) => changePage(e.target.innerHTML)}>2</Pagination.Item>}

                {currentStore.activePage > 1 && <Pagination.Item onClick={(e) => changePage(e.target.innerHTML)}>{currentStore.activePage - 1}</Pagination.Item>}
                <Pagination.Item active onClick={(e) => changePage(e.target.innerHTML)}>{currentStore.activePage}</Pagination.Item>
                {currentStore.activePage < currentStore.pagesTotal && <Pagination.Item onClick={(e) => changePage(e.target.innerHTML)}>{+currentStore.activePage + 1}</Pagination.Item>}

                {+currentStore.activePage === 1 && (+currentStore.pagesTotal === 3 || +currentStore.pagesTotal === 4) && <Pagination.Item onClick={(e) => changePage(e.target.innerHTML)}>3</Pagination.Item>}

                {(currentStore.activePage < currentStore.pagesTotal - 1 && width > 500 && currentStore.pagesTotal > 4) && <>
                    <Pagination.Ellipsis />
                    <Pagination.Item onClick={(e) => changePage(currentStore.pagesTotal)}>{currentStore.pagesTotal}</Pagination.Item>
                    <Pagination.Next onClick={(e) => changePage(+currentStore.activePage + 1)} />
                    <Pagination.Last onClick={(e) => changePage(currentStore.pagesTotal)} />
                </>}

            </Pagination>
        </div>
    );
});

export default PaginationCont;