import React, {useEffect ,useContext} from 'react';
import AboutSubPage from '../../components/about/AboutSubPage';
import AboutBlocks from '../../components/about/AboutBlocks';
import { brandData } from '../../utils/consts/aboutPageData';
import { fetchCard } from '../../utils/staticPages/aboutPage';
import { Context } from '../..';
import { observer } from 'mobx-react-lite';


const TheBrands = observer(() => {
    const { aboutPage } = useContext(Context);
    const card = aboutPage.currentCard;
    const cardId = 2;

    useEffect(()=>{
        fetchCard(aboutPage, cardId);

    }, [])
    return (
        <div className='sub-about'>
            <div className='sub-about__container'>
                <AboutSubPage {...card}>
                    <AboutBlocks blocksData={aboutPage.cardBlocks}/>
                </AboutSubPage>
            </div>
        </div>
    );
});

export default TheBrands;