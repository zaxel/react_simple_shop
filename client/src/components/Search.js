import { observer } from 'mobx-react-lite';
import React from 'react';

const Search = observer(({store, options, onSubmitSearch}) => {
    const onSelectChange = (e) => {
        store.setSearchBy(e.target.value)
    }
    const onSubmit = (e) => {
        if(!store.searchBy) {
            return alert('Please choose search by filter option!' )
        }
        if(store.searchByPrase === store.searchByLastPrase && store.searchBy === store.searchByLast){
            return;
        }
        store.setSearchByLastPrase(store.searchByPrase);
        store.setSearchByLast(store.searchBy);
        onSubmitSearch();
        store.setActivePage(1);
    }
    const opti = options.map(op=> <option key={op} value={op}>{op}</option>)
    opti.unshift(<option key={222} value={''}>{'search by: '}</option>)
    return (
        <div className='search'>
            <div className='search__container'>
            <input value={store.searchByPrase} onChange={(e)=>store.setSearchByPrase(e.currentTarget.value)} type='text' placeholder='Search'></input>
              <select value={store.searchBy} onChange={onSelectChange}>
                {opti}
              </select>
              <button onClick={onSubmit}>Go</button>
            </div>
              
        </div>
    );
});

export default Search;