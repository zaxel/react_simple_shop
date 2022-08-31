import React from 'react';
import AdminTextInput from '../../commonComponents/AdminTextInput';
import AdminImage from '../../commonComponents/AdminImage';

const Card = ({id, link, title, hero, app_button_dark_img, app_button_img}) => {
    const setInputDataCarry = (data) => {
        console.log(data);
    }
    return (
        <div className='admin-app__card app-card'>
            <h2>edit card with id {id}: </h2>
            <div className='app-card__img'>
                <AdminImage inputTitle={''} inputData={hero} cb={setInputDataCarry} alt={'card hero'}/>
                {/* <img src={process.env.REACT_APP_API_URL + hero} alt='hero' /> */}
            </div>
            <div className='app-card__title'>
                <AdminTextInput inputTitle={''} inputText={title} cb={setInputDataCarry}/>
            </div>
            <div className='app-card__buttons'>
                <div className='app-card__button-img'>
                    <img src={process.env.REACT_APP_API_URL + app_button_img} alt='button' />
                </div>
                <div className='app-card__button-img'>
                    <img src={process.env.REACT_APP_API_URL + app_button_dark_img} alt='button hover' />
                </div>
            </div>
        </div>
    )
};

export default Card;