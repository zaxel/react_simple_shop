import React from 'react';
import AdminTextInput from '../../commonComponents/AdminTextInput';
import { changeAboutBtnData } from '../../../../utils/staticPages/aboutPage';
import { Spinner } from 'react-bootstrap';

const ButtonCard = ({text, link, id, onDelClickHandler, loading}) => {
    const changeBtnTextCarry = changeAboutBtnData.bind(this, id, 'text');
    const changeBtnLinkCarry = changeAboutBtnData.bind(this, id, 'link');
    return (
        +loading === +id ?
        <div className="spinner">
                <Spinner animation="border" />
            </div> :
        <div className='about-buttons__btns'>
            <div className='about-buttons__title'>
                <AdminTextInput inputTitle={''} inputText={text} cb={changeBtnTextCarry}/>
            </div>
            <div className='about-buttons__link'>
                <AdminTextInput inputTitle={'link'} inputText={link} cb={changeBtnLinkCarry}/>
            </div>
            <button onClick={onDelClickHandler} className='about-buttons__delete'>X</button>
        </div>
    );
};

export default ButtonCard;