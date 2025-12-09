const makeSuggestionHistoryItems = (
    itemsReady,
    newItems,
    startIndex,
    startKey,
    icon,
    alt,
    selected
  ) => {
    const itemsToAdd = newItems.map((el, i) => {
      return (
        <li
          key={startKey + i}
          id={startIndex + i}
          className={
            "suggestion__item" + (selected === startIndex + i ? " active" : "")
          }
        >
          <div className="suggestion__item-container">
            <div className="suggestion__search-icon">
              <img src={icon} alt={alt} />
            </div>
            <p>{el}</p>
          </div>
        </li>
      );
    });
    return [...itemsReady, ...itemsToAdd];
  };

export const getSearchHistory = (history, selected, history_icon) => {
    const historyStored = localStorage.getItem("searchHistory");
    return makeSuggestionHistoryItems(
      history,
      JSON.parse(historyStored) || [],
      history.length,
      history.length - 1,
      history_icon,
      "history icon",
      selected
    );
  };
export const getSearchPopular = (history, selected, search_icon) => {
    // const popular = await getPopular();
    const popular = ["samsung tv", "used samsung galaxy"];
    return makeSuggestionHistoryItems(
      history,
      popular,
      history.length,
      history.length - 1,
      search_icon,
      "popular icon",
      selected
    );
  };
export const getSearchTrending = (history, selected, trading_icon) => {
    // const popular = await getTrending();
    const trending = ["samsung laptop"];
    return makeSuggestionHistoryItems(
      history,
      trending,
      history.length,
      history.length - 1,
      trading_icon,
      "trending icon",
      selected
    );
  };