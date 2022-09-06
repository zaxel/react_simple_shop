import React from 'react';
import AdminTextInput from '../../commonComponents/AdminTextInput';

const ButtonCard = ({text, link}) => {
    return (
        <div className='about-buttons__btns'>
            <div className='about-buttons__title'>
                <AdminTextInput inputTitle={''} inputText={text} />
            </div>
            <div className='about-buttons__link'>
                <AdminTextInput inputTitle={'link'} inputText={link} />
            </div>
            <button className='about-buttons__delete'>X</button>
        </div>
    );
};

export default ButtonCard;