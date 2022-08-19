import { getMainSetterName } from "../getStoreSetterName";
import { setQueryParamsString } from "../http/queryParams";
import { logoutOnClient } from "../logout";

export const setDataToStore = async (store, setterName, data) => {
    return await store[setterName](data);
}

export const fetchAll = async (cb, ...rest) => {
    // rest - id, sortBy, sortDirection, limit, page, searchBy, searchPrase, brandId, typeId
    const fetchedData = await cb(...rest);
    return fetchedData;
}

export const fetchDataSetStore = async (cb, currentStore, cartStore, userStore, flags) => {
    const { loadingOn, loadingOff, setToStore, setPageTotal, checkIfAuth } = flags;

    try {
        const setterName = getMainSetterName(currentStore);
        loadingOn && currentStore.setLoading(true);
        const data = await cb();
        setToStore && await setDataToStore(currentStore, setterName, data);
        setPageTotal && currentStore.setPagesTotal(Math.ceil(currentStore[currentStore.mainStoreFieldName].count / currentStore.itemsPerPage));
        return data;
    } catch (e) {
        if (e?.response?.status === 401 && userStore?.isAuth && checkIfAuth) {
            alert('Session timed out. You have to login back to continue!');
            return logoutOnClient(cartStore, userStore);
        }
        console.log(e);
        alert(e?.response?.data?.message);
        throw e;
    } finally {
        loadingOff && currentStore.setLoading(false);
    }
}

export const onSortTableClickHandler = async (cb, data, currentStore, toolTip, flags, setSearchParams) => {
    const { setLoading, setPageTotal } = flags;
    const setterName = getMainSetterName(currentStore);

    setLoading && currentStore.setLoading(true);
    toolTip.setIsToolTipShown(false);
    toolTip.setIsAvailable(false);
    if (currentStore.sortBy === data) {
        currentStore.sortDirection === 'ASC' ? currentStore.setSortDirection('DESC') : currentStore.setSortDirection('ASC');
    } else {
        currentStore.setSortDirection('ASC');
    }
    currentStore.setSortBy(data);
    setSearchParams && setQueryParamsString(setSearchParams, currentStore);
    const fetchedData = await cb();
    await setDataToStore(currentStore, setterName, fetchedData);
    setPageTotal && await currentStore.setPagesTotal(Math.ceil(currentStore[currentStore.mainStoreFieldName].count / currentStore.itemsPerPage));
    setLoading && currentStore.setLoading(false);
    toolTip.setIsAvailable(true);
    return fetchedData;
}