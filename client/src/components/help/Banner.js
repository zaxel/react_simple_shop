import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Context } from '../..';

const Banner = observer(() => {
    const {helpPage} = useContext(Context);
    return (
        <div className='help__banner help-banner' style={{backgroundImage: `url(${process.env.REACT_APP_API_URL+helpPage.pageHero})`}}>
            <h3>{helpPage.pageTitle}</h3>
            <div className='help-banner__container'>
                <input type="text" placeholder="Search for help" />
                <button onClick={() => console.log('search')} />
            </div>
        </div>
    );
});

export default Banner;