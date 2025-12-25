import React, { useContext, useEffect } from 'react';
import ProtectedCard from '../components/protected/ProtectedCard';
import { Context } from '..';
import { observer } from 'mobx-react-lite';
import { Spinner } from 'react-bootstrap';
import { fetchPage } from '../utils/staticPages/appPage';

const Protected = observer(() => {
    const { appPage } = useContext(Context);
    const protectedCards = appPage.pageCards.slice().sort((a, b) => a.id - b.id).map(card => <ProtectedCard {...card} key={card.title} />);

    useEffect(() => {
        fetchPage(appPage);
    }, [])

    if (appPage.loading) {
        return <div className="flex-auto w-full h-full min-h-[80vh] flex justify-center items-center">
            <Spinner className="w-8 h-8" />
        </div>
    }
    return (
        <div className='protected'>
            <div className='protected__container'>
                <h2 className='protected__title'>{appPage.pageTitle}</h2>
                <div className='protected__descr'>{appPage.pageText}</div>
                <div className='protected__cards'>{protectedCards}</div>
            </div>
        </div>
    );
});

export default Protected;