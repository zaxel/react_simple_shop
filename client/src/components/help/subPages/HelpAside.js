import React from 'react';
import Contacts from './Contacts';
import Search from './Search';
import Topics from './Topics';

const HelpAside = () => {
    return (
        <aside className='help__aside help-aside'>
            <Topics/>
            <Search/>
            <Contacts/>
        </aside>
    );
};

export default HelpAside;