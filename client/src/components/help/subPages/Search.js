import React, { useContext, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { HELP_CAT_ROUTE } from '../../../utils/consts/routes';
import { Context } from '../../..';

const Search = () => {
    const { helpPage } = useContext(Context);
    const [phrase, setPhrase] = useState('');
    const navigate = useNavigate();

    const onSearchButtonClickHandler = useCallback(() => {
        if (phrase.trim()) {
            helpPage.setSearchPhrase(phrase.trim());
            navigate(`${HELP_CAT_ROUTE}/search`);
            setPhrase('');
        }
    }, [phrase, helpPage, navigate]);

    const onKeyDownHandler = useCallback(e => {
        if (e.key === 'Enter') {
            e.preventDefault(); 
            onSearchButtonClickHandler();
        }
    }, [onSearchButtonClickHandler]);

    return (
        <div className="help-aside__search aside-search">
            <h3 className="aside-h3">Need to search for it?</h3>
            <div className="aside-search__wrapper">
                <input
                    type="text"
                    value={phrase}
                    onChange={(e)=>setPhrase(e.target.value)}
                    onKeyDown={onKeyDownHandler}
                    placeholder="Search for help"
                />
                <button
                    onClick={onSearchButtonClickHandler}
                    disabled={!phrase.trim()}
                    aria-label="Search"
                />
            </div>
        </div>
    );
};

export default Search;
