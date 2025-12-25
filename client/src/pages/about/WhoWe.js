import React, { useEffect, useContext } from 'react';
import AboutSubPage from '../../components/about/AboutSubPage';
import AboutBlocks from '../../components/about/AboutBlocks';
import { Context } from '../..';
import { fetchCard } from '../../utils/staticPages/aboutPage';
import { observer } from 'mobx-react-lite';
import { Spinner } from 'react-bootstrap';

const WhoWe = observer(() => {
    const { aboutPage } = useContext(Context);
    const card = aboutPage.currentCard;
    const cardId = 1;

    useEffect(() => {
        fetchCard(aboutPage, cardId);
    }, [])

    if (aboutPage.loading) {
        return <div className="flex-auto w-full h-[92dvh] flex justify-center items-center">
                    <Spinner  className="w-8 h-8"/>
                </div>
    }
    return (
        <div className='sub-about whoWe'>
            <div className='sub-about__container'>
                <AboutSubPage {...card}>
                    <AboutBlocks blocksData={aboutPage.cardBlocks} />
                </AboutSubPage>
            </div>
        </div>
    );
});

export default WhoWe;