import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "..";
import search_icon from "../assets/icons/shop-search.svg";
import history_icon from "../assets/icons/shop-timer.svg";
import trading_icon from "../assets/icons/shop-hot.svg";
import { fetchAllDevices } from "../http/deviceAPI";
import { getSearchHistory, getSearchPopular, getSearchTrending } from "../utils/mainSearch/history";
import { makeSuggestionSearchItems } from "../utils/mainSearch/suggestions";
import { setSearchResult } from "../utils/mainSearch/setSearchResult";
import { searchInputKeyDownHandler } from "../utils/mainSearch/searchInputKeyDownHandler";
import { useDebounceCallback } from "../hooks/useDebounceCallback";


const SearchBar = observer(({setSearchParams}) => {
  const { device } = useContext(Context);
  const [phrase, setPhrase] = useState("");
  const [historyPhrase, setHistoryPhrase] = useState("");
  const [selected, setSelected] = useState(-1);
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [searchOnFlyRes, setSearchOnFlyRes] = useState({ count: 0, rows: [] });
  const phraseAddedByTyping = useRef(null);
  const inputRef = useRef(null);
  
  const historyItems = useMemo(() => {
    let history = [];
    history = getSearchHistory(history, selected, history_icon);
    history = getSearchPopular(history, selected, search_icon);
    history = getSearchTrending(history, selected, trading_icon);
    return history;
  }, [selected]);

  const debounceFetch = useDebounceCallback(async (searchPhrase) => {
    try {
      const result = await fetchAllDevices(
        null, null, null, 10, 1, null, null, null, null, searchPhrase
      );
           const items = makeSuggestionSearchItems(result.rows, search_icon, "search icon", selected);
        setSearchOnFlyRes(result);
        setSearchSuggestions(items);
    } catch (error) {
      console.error("Error fetching search items:", error);
    }
  }, 300);
 
  useEffect(() => {
        if (phraseAddedByTyping.current) {
      debounceFetch(phrase);
    }
    return () => debounceFetch.cancel && debounceFetch.cancel();
  }, [phrase]);

  useEffect(() => {
    const items = makeSuggestionSearchItems(
      searchOnFlyRes.rows,
      search_icon,
      "search icon",
      selected
    );
    setSearchSuggestions(items);
  }, [selected]);


  const onInputKeyDownHandler = (e) => {
    phraseAddedByTyping.current = true;
    let length = phrase === "" ? historyItems.length : searchSuggestions.length;
    searchInputKeyDownHandler(
      e, 
      phraseAddedByTyping, 
      setSelected,
      length,
      setHistoryPhrase,
      setPhrase,
      device,
      phrase,
      historyPhrase,
      selected
  );
  };
  const onInputFocusHandler = (e) => {
    setSelected(-1);
  };

  const onSearchSuggestionsClickHandler = (e) => {
    const li = e.target.closest("li");
    if (!li.id) return;
    const liTitleText = li.children[0].children[1].textContent;
    setSearchResult(device, liTitleText, phrase, historyPhrase, setHistoryPhrase, setPhrase, setSelected, selected);
  };

  const renderSuggestions = () => {
    const suggestions = phrase === "" ? historyItems : searchSuggestions;
    const label = phrase === "" ? "Recent Search" : "Search Result";

    return (
      <ul
        onClick={onSearchSuggestionsClickHandler}
        className={`shop-search__suggestions suggestions ${
          phrase === "" ? "suggestions__history" : "suggestions__response"
        }`}
      >
        <li key={0} className="suggestions__recent-searches">
          {label}
        </li>
        {suggestions.length ? suggestions : <li className="suggestion__item">nothing found</li>}
      </ul>
    );
  }

  return (
    <div className="shop-search">
      <div className="shop-search__container py-5">
        <div className="shop-search__search-wrapper">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="shop-search__search-box"
          >
            <input
              ref={inputRef}
              value={phrase === "" ? historyPhrase : phrase}
              onChange={(e) => {
                setHistoryPhrase("");
                setSelected(-1);
                setPhrase(e.target.value);
              }}
              onKeyDown={onInputKeyDownHandler}
              onFocus={onInputFocusHandler}
              type="text"
              className="shop-search__search-input form-control"
              placeholder="Search Arazon"
            ></input>
            <button
              onClick={()=>setSearchResult(device, null, phrase, historyPhrase, setHistoryPhrase, setPhrase, setSelected, selected)}
              className="shop-search__search-button"
            >
              <img
                className="shop-search__search-icon"
                src={search_icon}
                alt="search icon"
              />
            </button>
            {renderSuggestions()}
          </form>
        </div>
      </div>
    </div>
  );
});

export default SearchBar;
