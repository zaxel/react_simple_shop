import { getSetterName } from "../getStoreSetterName";

export const setQueryParamsString = (setSearchParams, store) => {
    const paramsNames = ['id', 'sortBy', 'sortDirection', 'itemsPerPage', 'activePage', 'searchBy', 'searchByPrase', 'brandActive', 'typeActive'];
    let params = {};
    paramsNames.filter(el => store[el]).forEach(el => {

        params[el] = store[el]
    })
    setSearchParams(params);
}
export const getQueryParamsString = (searchParams, store) => {
    const allowedParamsNames = ['id', 'sortBy', 'sortDirection', 'itemsPerPage', 'activePage', 'searchBy', 'searchByPrase', 'brandActive', 'typeActive'];

    for (let key of searchParams.keys()) {
        if (allowedParamsNames.includes(key)) {
            const setterName = getSetterName(key);
            store[setterName]?.(searchParams.get(key));
        }
    }
}