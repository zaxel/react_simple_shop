import { observer } from 'mobx-react-lite';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { setQueryParamsString } from '../utils/http/queryParams';

const Search = observer(({store, options, onSubmitSearch}) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const onSelectChange = (e) => {
        store.setSearchBy(e.target.value)
    }
    const onSubmit = (e) => {
        if(!store.searchByPrase || !store.searchBy)
            store.setSearchBy("");
        
        if(store.searchByPrase === store.searchByLastPrase && store.searchBy === store.searchByLast)
            return;
        
        store.setSearchByLastPrase(store.searchByPrase);
        store.setSearchByLast(store.searchBy);
        setQueryParamsString(setSearchParams, store);
        onSubmitSearch();
        store.setActivePage(1);
    }

    const opti = options.map(op=> {
        const key = Object.keys(op)[0]
        return <option key={key} value={key}>{op[key]}</option>
    })
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