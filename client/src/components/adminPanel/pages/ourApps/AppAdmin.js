import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import android from '../../../../assets/protected/android.jpg'
import AdminTextInput from '../../commonComponents/AdminTextInput';
import { Context } from '../../../..';
import { fetchPage, setData } from '../../../../utils/staticPages/appPage';
import Card from './Card';

const AppAdmin = observer(() => {
    const { appPage } = useContext(Context);
    const appCards = appPage.pageCards.map(card => {
        return <Card {...card} key={card.id} />
    });

    useEffect(()=>{
        fetchPage(appPage);
    }, [])

    // if (types.loading) {
    //     return (
    //         <div className="spinner">
    //             <Spinner animation="border" />
    //         </div>
    //     )
    // }
    return (
        <div className='admin-pages__app admin-pages__page admin-app'>
            <div className='admin-app__container admin-pages__container'>
                <h2>Edit content of "{appPage.pageName} Page".</h2>
                <AdminTextInput title={'page title'} text={appPage.pageTitle} cb={setData} store={appPage}/>
                <div className='admin-app__descr'>
                    <h2>edit description: </h2>
                    <p>description</p> 
                </div>
                <div className='admin-app__cards-cont'>
                    <h2>edit cards: </h2>
                    <div className='admin-app__cards'>
                        {appCards}
                    </div>
                     
                </div>
            </div>
        </div>
    );
});

export default AppAdmin;