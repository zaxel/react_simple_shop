import React from 'react';
import { Outlet } from 'react-router-dom';

const Help = () => {

    return (
        <div className='help'>
            <div className='help__container'>
                <Outlet />
            </div>
        </div>

    );
};

export default Help;