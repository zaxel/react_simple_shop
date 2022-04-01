import React, { useState, useContext } from 'react';
import { Pagination } from 'react-bootstrap';
import { Context } from '..';
import useWindowSize from '../hooks/useWindowSize';
import { observer } from 'mobx-react-lite';

const PaginationCont = observer(() => {
    const {device} = useContext(Context);

    const [width, height] = useWindowSize();

    const changePage = (number) => {
        if (isNaN(number)) return;
        device.setActivePage(number);
    }


    return (
        <div className='pagination__cont'>
            <Pagination size="lg">
                {(device.activePage > 2 && width>500 && device.pagesTotal>4) && <>
                    <Pagination.First onClick={(e) => changePage(1)} />
                    <Pagination.Prev onClick={(e) => changePage(device.activePage - 1)} />
                    <Pagination.Item onClick={(e) => changePage(e.target.innerHTML)}>{1}</Pagination.Item>
                    <Pagination.Ellipsis />
                </>}
                
                
                {+device.activePage === 3 && +device.pagesTotal === 3  && <Pagination.Item onClick={(e) => changePage(e.target.innerHTML)}>1</Pagination.Item>}
                {+device.activePage === 4 && +device.pagesTotal === 4  && <Pagination.Item onClick={(e) => changePage(e.target.innerHTML)}>2</Pagination.Item>}
                
                {device.activePage > 1 && <Pagination.Item onClick={(e) => changePage(e.target.innerHTML)}>{device.activePage - 1}</Pagination.Item>}
                <Pagination.Item active onClick={(e) => changePage(e.target.innerHTML)}>{device.activePage}</Pagination.Item>
                {device.activePage < device.pagesTotal && <Pagination.Item onClick={(e) => changePage(e.target.innerHTML)}>{+device.activePage + 1}</Pagination.Item>}
                
                {+device.activePage === 1 && (+device.pagesTotal === 3 || +device.pagesTotal === 4) && <Pagination.Item onClick={(e) => changePage(e.target.innerHTML)}>3</Pagination.Item>}
                
                {(device.activePage < device.pagesTotal - 1 && width>500 && device.pagesTotal>4) && <>
                    <Pagination.Ellipsis />
                    <Pagination.Item onClick={(e) => changePage(device.pagesTotal)}>{device.pagesTotal}</Pagination.Item>
                    <Pagination.Next onClick={(e) => changePage(+device.activePage + 1)} />
                    <Pagination.Last onClick={(e) => changePage(device.pagesTotal)} />
                </>}

            </Pagination>
        </div>
    );
});

export default PaginationCont;