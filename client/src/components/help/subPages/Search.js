import React from 'react';

const Search = () => {
    return (
        <div className='help-aside__search aside-search'>
            <h3 className='aside-h3'>need to search for it?</h3>
            <div className='aside-search__wrapper'>
                <input type='text' placeholder='Search for help'/>
                <button onClick={()=>console.log('search')}></button>
            </div>
        </div>
    );
};

export default Search;