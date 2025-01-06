import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { HELP_CAT_ROUTE } from '../../../utils/consts/routes';
import { Context } from '../../..';

const Search = () => {
    const {helpPage} = useContext(Context);
    return (
        <div className='help-aside__search aside-search'>
            <h3 className='aside-h3'>need to search for it?</h3>
            <div className='aside-search__wrapper'>
                <input type='text' placeholder='Search for help'/>
                <Link to={HELP_CAT_ROUTE + "/search"}> 
                    <button onClick={()=>helpPage.setSearchPhrase("how can I pay?")} />
                </Link> 
            </div>
        </div>
    );
};

export default Search;