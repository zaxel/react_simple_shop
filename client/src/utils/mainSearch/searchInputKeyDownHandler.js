import { setSearchResult } from "./setSearchResult";

export const searchInputKeyDownHandler = (
    e, 
    addedByTypingRef, 
    setSelected,
    length,
    setHistoryPhrase,
    setPhrase,
    device,
    phrase,
    historyPhrase,
    selected
) => {
    const ul = e.target.nextElementSibling.nextElementSibling;
        const isSearchHistoryItems = ul.classList.contains("suggestions__history");
    
    
        const getSearchPhrase = (selected) => {
          const li = Array.from(
            e.target.nextElementSibling.nextElementSibling.children
          ).find((el) => el.id === selected.toString());
          return li.children[0].children[1].textContent;
        };
        switch (e.key) {
          case "ArrowDown":
            addedByTypingRef.current = false;
            setSelected((prev) => {
              const newVal = (length + prev + 1) % length;
              isSearchHistoryItems
                ? newVal>=0 && setHistoryPhrase(getSearchPhrase(newVal))
                : newVal>=0 && setPhrase(getSearchPhrase(newVal));
              return newVal;
            });
            break;
          case "ArrowUp":
            addedByTypingRef.current = false;
            setSelected((prev) => {
              const newVal = (length + prev - 1) % length;
              isSearchHistoryItems
                ? newVal>=0 && setHistoryPhrase(getSearchPhrase(newVal))
                : newVal>=0 && setPhrase(getSearchPhrase(newVal));
              return newVal;
            });
            break;
          case "Enter":
            setSearchResult(device, null, phrase, historyPhrase, setHistoryPhrase, setPhrase, setSelected, selected);
            break;
          default:
            break;
        }
}