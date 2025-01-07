import { observer } from 'mobx-react-lite';
import React, { useContext, useState, useEffect, useCallback } from 'react';
import { Context } from '../..';
import { useNavigate } from 'react-router-dom';
import { HELP_CAT_ROUTE } from '../../utils/consts/routes';

const Banner = observer(() => {
    const {helpPage} = useContext(Context);
    const [bannerDivStyle, setBannerDivStyle] = useState(null);

    const [phrase, setPhrase] = useState('');
    const navigate = useNavigate();

    const onSearchButtonClickHandler = useCallback(() => {
        if (phrase.trim()) {
            helpPage.setSearchPhrase(phrase.trim());
            navigate(`${HELP_CAT_ROUTE}/search`);
            setPhrase('');
        }
    }, [phrase, helpPage, navigate]);

    const onKeyDownHandler = useCallback(e => {
        if (e.key === 'Enter') {
            e.preventDefault(); 
            onSearchButtonClickHandler();
        }
    }, [onSearchButtonClickHandler]);


    useEffect(()=>{
        if(helpPage.pageHero)
            setBannerDivStyle({backgroundImage: `url(${process.env.REACT_APP_API_URL + helpPage.pageHero})`});
    }, [helpPage.pageHero])

    return (
        <div className='help__banner help-banner' style={bannerDivStyle}>
            <h3>{helpPage.pageTitle}</h3>
            <div className='help-banner__container'>
            <input
                    type="text"
                    value={phrase}
                    onChange={(e)=>setPhrase(e.target.value)}
                    onKeyDown={onKeyDownHandler}
                    placeholder="Search for help"
                />
                <button
                    onClick={onSearchButtonClickHandler}
                    disabled={!phrase.trim()}
                    aria-label="Search"
                />
            </div>
        </div>
    );
}); 

export default Banner;