import React from 'react';
import { useState } from 'react';

const Search = () => {
    const [input, setInput] = useState('');
    const [select, setSelect] = useState('value1');

    const submitSearch = () => {
        console.log(select)
    }
    const onSelectChange = (e) => {
        setSelect(prev => e.target.value)
    }
    return (
        <div className='search'>
            <div className='search__container'>
            <input value={input} onChange={(e)=>setInput(e.currentTarget.value)} type='text' placeholder='Search'></input>
              <select value={select} onChange={onSelectChange}>
                  <option value={'ID'}>ID</option>
                  <option value={'ROLE'}>ROLE</option>
                  <option value={'email'}>ADMINISTRATOR</option>
              </select>
              <button onClick={submitSearch}>Go</button>
            </div>
              
        </div>
    );
};

export default Search;