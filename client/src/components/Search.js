import { observer } from 'mobx-react-lite';
import React from 'react';
import { useState } from 'react';

const Search = observer(({store, options}) => {
    const [input, setInput] = useState('');

    const submitSearch = () => {
        console.log(store.searchBy)
    }
    const onSelectChange = (e) => {
        store.setSearchBy(e.target.value)
    }
    const opti = options.map(op=> <option key={op} value={op}>{op}</option>)
    opti.unshift(<option key={222} value={''}>{'search by: '}</option>)
    return (
        <div className='search'>
            <div className='search__container'>
            <input value={input} onChange={(e)=>setInput(e.currentTarget.value)} type='text' placeholder='Search'></input>
              <select value={store.searchBy} onChange={onSelectChange}>
                {opti}
              </select>
              <button onClick={submitSearch}>Go</button>
            </div>
              
        </div>
    );
});

export default Search;