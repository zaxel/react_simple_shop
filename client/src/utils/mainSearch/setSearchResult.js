import { setLocalStoreSearchHistory } from "./setLocalStoreSearchHistory";

export const setSearchResult = (device, phrase, search, historyPhrase, setHistoryPhrase, setPhrase, setSelected, selected) => {
    if(phrase || search || historyPhrase){ 
     device.setSearchKey(phrase || search || historyPhrase);
     device.setActivePage(1);
     device.setBrandActive(null);
     device.setTypeActive(null);
    }
    if (phrase === "" && selected === -1) return;
    setLocalStoreSearchHistory(phrase || search || historyPhrase);
    setHistoryPhrase("");
    setPhrase("");
    setSelected(-1);
  };