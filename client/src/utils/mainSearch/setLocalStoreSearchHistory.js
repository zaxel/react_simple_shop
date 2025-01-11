export const setLocalStoreSearchHistory = (phrase) => {
  try {
    if (!phrase || phrase.trim() === "") return;
    const maxStoredItems = 5;
    const historyStored =
      JSON.parse(localStorage.getItem("searchHistory")) || [];
    const filteredHistory = historyStored.filter((item) => item !== phrase);
    filteredHistory.unshift(phrase);
    const trimmedHistory = filteredHistory.slice(0, maxStoredItems);
    localStorage.setItem("searchHistory", JSON.stringify(trimmedHistory));
  } catch (e) {
    console.error("Error setting localstorage search items:", e);
  }
};
