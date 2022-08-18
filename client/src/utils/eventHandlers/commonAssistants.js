export const offEditOnTooltip = (setEdit, toolTip) => {
    setEdit(false);
    toolTip.setIsAvailable(true);
} 

export const loadingAndFetch = async(setLoading, cb) => {
    setLoading(true);
    const data = await cb();
    !data?.loggedOut && setLoading(false);
    if (data?.loggedOut) return;
    return data;
}

export const isStateChangedTableFieldCommon = (store, storeFieldName, infoId, dbFieldName, value) => {
    store = ('rows' in store[storeFieldName]) ? store[storeFieldName].rows : store[storeFieldName];
    const currentStoreInfoObj = store.find(el => el.id === infoId);
    return currentStoreInfoObj[dbFieldName] === value ? false : true;
  }